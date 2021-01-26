"use strict";

const {decode} = require("@msgpack/msgpack");
const EC = require("elliptic").ec;
const crypto = require("crypto")

const getKey = (compressedKeyInBase64) => {
    const ec = new EC('p256');
    const pubKeyBuffer = Buffer.from(compressedKeyInBase64, 'base64');
    const pubKeyXY = Buffer.concat([Buffer.from([0x04]), pubKeyBuffer]);
    return ec.keyFromPublic(pubKeyXY);
}

const upp = (uppInBase64) => {
    const buff = Buffer.from(uppInBase64, 'base64');
    return {
        bytes: buff,
        decoded: decode(buff)
    };
}

const getSignedAndSignature = (upp) => {
    const signed = upp.bytes.subarray(0, upp.bytes.length - 66)
    const signeHash = crypto.createHash('sha256').update(signed).digest()
    const signatureBuffer = upp.decoded[5]
    const signaturePoints = {
        r: signatureBuffer.subarray(0, signatureBuffer.length / 2),
        s: signatureBuffer.subarray(signatureBuffer.length / 2, signatureBuffer.length)
    };

    return {
        signed: signed,
        signedHash: signeHash,
        signature: signatureBuffer,
        signaturePoints: signaturePoints
    }
}

const verify = (compressedKeyInBase64, uppInBase64) => {
    const pk = getKey(compressedKeyInBase64)
    const decoded = upp(uppInBase64)
    const sBom = getSignedAndSignature(decoded)

    return pk.verify(sBom.signedHash, sBom.signaturePoints)
}

module.exports = {getKey, upp, getSignedAndSignature, verify};

