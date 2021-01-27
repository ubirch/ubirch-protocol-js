"use strict";

const verify = require("./verify");
const fetch = require('node-fetch');

const getKeys = async (stage, uuid) => {
    const url = "https://identity." + stage + ".ubirch.com/api/keyService/v1/pubkey/current/hardwareId/" + uuid;
    return await fetch(url)
        .then(response => response.json())
        .catch((reason) => {
            console.error(reason);
        });
}

const verifyFromKeyService = async (stage, uuid, uupBase64) => {
    const keys = await getKeys(stage, uuid);
    const pubKeys = keys.map(x => x.pubKeyInfo.pubKey);
    const vers = pubKeys.map(x => verify.verifyWithUUID(uuid, x, uupBase64));

    if(vers.length <= 0){
        return false;
    }

    return vers;
}

module.exports = {verifyFromKeyService};

