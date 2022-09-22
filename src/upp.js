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

const { verify, verifyWithUUID } = require('./verify');
const {
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
  getJSONFromMsgPackPayload } = require('./upp-parts');
const { verifyFromKeyService } = require('./verify-with-key-service');

module.exports = {
  verify,
  verifyWithUUID,
  verifyFromKeyService,
  UPP_TYPE,
  tools: {
    upp,
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
  }
};
