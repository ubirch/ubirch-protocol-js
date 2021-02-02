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

"use strict";

const {decode} = require("@msgpack/msgpack");
const EC = require("elliptic").ec;
const crypto = require("crypto");
const uuidParse = require('uuid');
const Buffer = require('buffer/').Buffer; // note: the trailing slash is important!

const ProtocolVersion = 2

// Commented out as it is currently not used
// const PLAIN = (ProtocolVersion << 4) | 0x01
const SIGNED = (ProtocolVersion << 4) | 0x02
const CHAINED = (ProtocolVersion << 4) | 0x03

const getKey = (compressedKeyInBase64) => {
    const pubKeyBuffer = Buffer.from(compressedKeyInBase64, 'base64');

    if(pubKeyBuffer.length !== 64) {
        throw new Error("Invalid ECDSA Key Compressed");
    }
    // We add 0x04 to make it compressed compatible
    const pubKeyXY = Buffer.concat([Buffer.from([0x04]), pubKeyBuffer]);

    const ec = new EC('p256');
    return ec.keyFromPublic(pubKeyXY);
};

const uppLengthCheck = (decodedUPP) => {
    if(decodedUPP.length <= 4 || decodedUPP.length >= 7) {
        throw new Error("Invalid UPP");
    }
};

const uppVersionCheck = (decodedUPP) => {
    const version = decodedUPP[0] & 0x0F;
    switch (version) {
        case CHAINED & 0x0F:
        case SIGNED & 0x0F:
            break;
        default:
            throw new Error("Protocol Version not supported :: " + version);
    }
};

const upp = (uppInBase64) => {
    const buff = Buffer.from(uppInBase64, 'base64');
    const parts = decode(buff);

    uppLengthCheck(parts);
    uppVersionCheck(parts);

    return {
        bytes: buff,
        decoded: decode(buff)
    };
};

const getSignedAndSignature = (upp) => {

    uppLengthCheck(upp.decoded);
    uppVersionCheck(upp.decoded);

    const signed = upp.bytes.subarray(0, upp.bytes.length - 66)
    const signeHash = crypto.createHash('sha256').update(signed).digest()
    const signatureBuffer = upp.decoded[upp.decoded.length - 1]
    const signaturePoints = {
        r: signatureBuffer.subarray(0, signatureBuffer.length / 2),
        s: signatureBuffer.subarray(signatureBuffer.length / 2, signatureBuffer.length)
    };

    return {
        signed: signed,
        signedHash: signeHash,
        signature: signatureBuffer,
        signaturePoints: signaturePoints
    };

};

const billOfMaterials = (compressedKeyInBase64, uppInBase64) => {
    const pk = getKey(compressedKeyInBase64)
    const uppBom = upp(uppInBase64)
    const sBom = getSignedAndSignature(uppBom)

    return {
        uuid: uuidParse.stringify(uppBom.decoded[1]),
        pk: pk,
        decoded: uppBom,
        sBom: sBom
    };
};

const verify = (compressedKeyInBase64, uppInBase64) => {
    const bom = billOfMaterials(compressedKeyInBase64, uppInBase64);
    return bom.pk.verify(bom.sBom.signedHash, bom.sBom.signaturePoints);
};

const verifyWithUUID = (uuid, compressedKeyInBase64, uppInBase64) => {
    const bom = billOfMaterials(compressedKeyInBase64, uppInBase64);
    return bom.uuid === uuid && bom.pk.verify(bom.sBom.signedHash, bom.sBom.signaturePoints);
};

module.exports = {tools: {getKey, upp, getSignedAndSignature, billOfMaterials}, verify, verifyWithUUID};

