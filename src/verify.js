"use strict";

const {decode} = require("@msgpack/msgpack");
const EC = require("elliptic").ec;
const crypto = require("crypto")
const uuidParse = require('uuid');
const Buffer = require('buffer/').Buffer  // note: the trailing slash is important!

const getKey = (compressedKeyInBase64) => {
    const pubKeyBuffer = Buffer.from(compressedKeyInBase64, 'base64');

    if(pubKeyBuffer.length !== 64) {
        throw new Error("Invalid ECDSA Key Compressed");
    }
    // We add 0x04 to make it compressed compatible
    const pubKeyXY = Buffer.concat([Buffer.from([0x04]), pubKeyBuffer]);

    const ec = new EC('p256');
    return ec.keyFromPublic(pubKeyXY);
}

const uppLengthCheck = (decodedUPP) => {
    if(decodedUPP.length <= 4 || decodedUPP.length >= 7) {
        throw new Error("Invalid UPP");
    }
}

const upp = (uppInBase64) => {
    const buff = Buffer.from(uppInBase64, 'base64');
    const parts = decode(buff);

    uppLengthCheck(parts);

    return {
        bytes: buff,
        decoded: decode(buff)
    };
}

const getSignedAndSignature = (upp) => {

    uppLengthCheck(upp.decoded);

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

}

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
}

const verify = (compressedKeyInBase64, uppInBase64) => {
    const bom = billOfMaterials(compressedKeyInBase64, uppInBase64);
    return bom.pk.verify(bom.sBom.signedHash, bom.sBom.signaturePoints);
}

const verifyWithUUID = (uuid, compressedKeyInBase64, uppInBase64) => {
    const bom = billOfMaterials(compressedKeyInBase64, uppInBase64);
    return bom.uuid === uuid && bom.pk.verify(bom.sBom.signedHash, bom.sBom.signaturePoints);
}

module.exports = {tools: {getKey, upp, getSignedAndSignature, billOfMaterials}, verify, verifyWithUUID};

