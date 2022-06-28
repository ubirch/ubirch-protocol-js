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

const Buffer = require('buffer/').Buffer; // note: the trailing slash is important!
const EC = require('./ec-key');
const EDDSA = require('./eddsa-key');

const getKey = (keyInBase64) => {
  const pubKeyBuffer = Buffer.from(keyInBase64, 'base64');

  let key;
  if (pubKeyBuffer.length === 64) {
    key = EC.getKey(keyInBase64);
  } else if (pubKeyBuffer.length === 32) {
    key = EDDSA.getKey(keyInBase64);
  } else {
    throw new Error('Invalid ECDSA/EDDSA Key Size');
  }

  return key;
};

const isEC = (materializedKey) => {
  return materializedKey.ec !== undefined;
};

const isEDDSA = (materializedKey) => {
  return materializedKey.eddsa !== undefined;
};

module.exports = { getKey, isEC, isEDDSA };
