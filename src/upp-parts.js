/*
 * Copyright (c) 2020 ubirch GmbH.
 *
 * ```
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ```
 */

'use strict';

const { decode, encode } = require('@msgpack/msgpack');
const crypto = require('crypto');
const uuidParse = require('uuid');
const zlib = require('zlib');
const base45 = require('base45');

const Buffer = require('buffer/').Buffer; // note: the trailing slash is important!
const { getKey } = require('./key');

const ProtocolVersion = 2;

// Commented out as it is currently not used
// const PLAIN = (ProtocolVersion << 4) | 0x01
const SIGNED = (ProtocolVersion << 4) | 0x02;
const CHAINED = (ProtocolVersion << 4) | 0x03;

const UPP_TYPE = {
  CHAINED: 'CHAINED',
    SIGNED: 'SIGNED',
//  PLAIN: 'PLAIN'
}

const UPP_TYPE_BYTE = {
  CHAINED: 0x00,
  SIGNED: 0xEE
}

const UPP_PREFIX = {
  CHAINED: '',
  SIGNED:  "C01:"
}

const uppLengthCheck = (decodedUPP) => {
  if (decodedUPP.length <= 4 || decodedUPP.length >= 7) {
    throw new Error('Invalid UPP');
  }
};

const uppVersionCheck = (decodedUPP) => {
  const version = decodedUPP[0] & 0x0F;
  switch (version) {
    case CHAINED & 0x0F:
    case SIGNED & 0x0F:
      break;
    default:
      throw new Error('Protocol Version not supported :: ' + version);
  }
};

const upp = (uppInBase64) => {
  const buff = Buffer.from(uppInBase64, 'base64');
  const parts = decode(buff);

  uppLengthCheck(parts);
  uppVersionCheck(parts);

  return {
    bytes: buff,
    decoded: parts
  };
};

const uppSignedLengthCheck = (signed) => {
  if (signed.length === 0) {
    throw new Error('Empty signed data.');
  }
};

const getSignedAndSignature = (upp) => {
  uppLengthCheck(upp.decoded);
  uppVersionCheck(upp.decoded);

  const signed = upp.bytes.subarray(0, upp.bytes.length - 66);
  uppSignedLengthCheck(signed);

  const signedSHA256 = crypto.createHash('sha256').update(signed).digest();
  const signedSHA512 = crypto.createHash('sha512').update(signed).digest();
  const signatureBuffer = upp.decoded[upp.decoded.length - 1];
  const signaturePoints = {
    r: signatureBuffer.subarray(0, signatureBuffer.length / 2),
    s: signatureBuffer.subarray(signatureBuffer.length / 2, signatureBuffer.length)
  };

  return {
    signed,
    signedSHA256,
    signedSHA512,
    signature: signatureBuffer,
    signaturePoints
  };
};

const billOfMaterials = (compressedKeyInBase64, uppInBase64) => {
  const pk = getKey(compressedKeyInBase64);
  const uppBom = upp(uppInBase64);
  const sBom = getSignedAndSignature(uppBom);

  return {
    uuid: getUUIDFromUpp(uppBom),
    pk,
    decoded: uppBom,
    sBom
  };
};

const getUUIDFromUpp = (upp) => {
  return uuidParse.stringify(upp.decoded[1]);
};

const createMsgPackPayloadFromJSON = (jsonPayload) => {
    const encoded = encode(jsonPayload);
    const buffer = Buffer.from(encoded.buffer, encoded.byteOffset, encoded.byteLength);
    return buffer;
  }

const replaceHashByMsgPackInUpp = (hashUpp, msgPackPayload, uppType = UPP_TYPE.SIGNED) => {
  let unpacked_upp = decode(Buffer.from(hashUpp, 'base64'));
  const uppLength = unpacked_upp.length;

  unpacked_upp[uppLength - 2] = msgPackPayload;
  unpacked_upp[uppLength - 3] = UPP_TYPE_BYTE[uppType];

  return encode(unpacked_upp);
}

/**
 * C01:BASE45_STRING(COMPRESS_ZLIB(NEW UPP))
 * @param msgPackUpp: UInt8Array
 * @param uppType: SIGNED (default) (, CHAINED, PLAIN - not yet implemented)
 * @returns {string} signed UPP
 */
const packSignedUpp = (msgPackUpp, uppType = UPP_TYPE.SIGNED) => {
  const buf = Buffer.from(msgPackUpp);
  const zlibbed_upp = zlib.deflateSync(buf);

  const base45ed_upp = base45.encode(zlibbed_upp);

  return UPP_PREFIX[uppType] + base45ed_upp;
}

const getHashedPayload = (payload) => {
  return crypto.createHash('sha256').update(payload).digest('base64');
}

const unpackBase64String = (uppStr) => {
  return Buffer.from(uppStr, 'base64');
}

const uppHasCorrectTypePrefix = (upp, uppType) => {
  try {
    return upp && upp.startsWith(UPP_PREFIX[uppType]);
  } catch (e) {
    return false;
  }
}

const unpackSignedUpp = (packedSignedUpp) => {

  if (! uppHasCorrectTypePrefix(packedSignedUpp, UPP_TYPE.SIGNED)) {
    throw new Error("VERIFICATION_FAILED_WRONG_TYPE_PREFIX");
  }

  const upp_withoutPrefix = packedSignedUpp.replace(new RegExp("^" + UPP_PREFIX[UPP_TYPE.SIGNED]), '');

  const unBase45ed_upp = base45.decode(upp_withoutPrefix);

  const unzipped_msgpacked_upp =  zlib.inflateSync(unBase45ed_upp);

  const unpackedUpp = decode(unzipped_msgpacked_upp);

  return unpackedUpp;
}

function checkUppType(unpackedUpp, uppType) {
  try {
    const len = unpackedUpp.length;
    const typeOfUPP = unpackedUpp[len-3];
    return typeOfUPP === UPP_TYPE_BYTE[uppType];
  } catch (e) {
    return false;
  }
}


function getMsgPackPayloadFromUpp(unpackedUpp) {
  const len = unpackedUpp.length;
  return unpackedUpp[len - 2];
}

function getJSONFromMsgPackPayload(msgPackPayload) {
  return decode(msgPackPayload);
}

module.exports = {
  upp,
  UPP_TYPE,
  getSignedAndSignature,
  billOfMaterials,
  getUUIDFromUpp,
  createMsgPackPayloadFromJSON,
  getHashedPayload,
  replaceHashByMsgPackInUpp,
  packSignedUpp,
  unpackBase64String,
  unpackSignedUpp,
  getMsgPackPayloadFromUpp,
  getJSONFromMsgPackPayload
};
