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

const verify = require("./verify");
const fetch = require('node-fetch');

const getKeys = async (stage, uuid) => {

    if(uuid === ""){
        throw new Error("UUID can't be empty.")
    }

    const url = "https://identity." + stage + ".ubirch.com/api/keyService/v1/pubkey/current/hardwareId/" + uuid;
    return await fetch(url)
        .then(response => response.json())
        .catch((reason) => {
            console.error(reason);
        });
};

const verifyFromKeyService = async (stage, uuid, uupBase64) => {
    const keys = await getKeys(stage, uuid);
    const pubKeys = keys.map(x => x.pubKeyInfo.pubKey);
    const vers = pubKeys
        .map(x => verify.verifyWithUUID(uuid, x, uupBase64))
        .reduce((a, b) => a && b);

    if(vers.length <= 0){
        return false;
    }

    return vers;
};

module.exports = {verifyFromKeyService};

