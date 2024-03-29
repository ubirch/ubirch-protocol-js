/*
 * Copyright (c) 2022 ubirch GmbH.
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

const EdDSA = require('elliptic').eddsa;
const Buffer = require('buffer/').Buffer; // note: the trailing slash is important!

const getKey = (keyInBase64) => {
  const pubKeyBuffer = Buffer.from(keyInBase64, 'base64');

  if (pubKeyBuffer.length !== 32) {
    throw new Error('Invalid EdDSA Key Size');
  }

  // only this curve is supported
  const ec = new EdDSA('ed25519');
  return ec.keyFromPublic([...pubKeyBuffer]);
};

module.exports = { getKey };
