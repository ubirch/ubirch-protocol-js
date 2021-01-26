"use strict";

const verify = require("./verify");

const getKeys = async (uuid) => {
    const url = "https://identity.prod.ubirch.com/api/keyService/v1/pubkey/current/hardwareId/" + uuid
    return await fetch(url)
        .then(response => response.json())
        .catch((reason) => {
            console.error(reason)
        })
}

const verifyFromKeyService = async (uuid, uupBase64) => {
    const keys = await getKeys(uuid)
    const pubKeys = keys.map(x => x.pubKeyInfo.pubKey)
    return pubKeys.map(x => verify.verifyWithUUID(uuid, x, uupBase64))
}

module.exports = {verifyFromKeyService};

