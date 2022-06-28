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

const EC = require('elliptic').ec;
const Buffer = require('buffer/').Buffer; // note: the trailing slash is important!

const getKey = (compressedKeyInBase64) => {
  const pubKeyBuffer = Buffer.from(compressedKeyInBase64, 'base64');

  if (pubKeyBuffer.length !== 64) {
    throw new Error('Invalid ECDSA Key Compressed');
  }
  // We add 0x04 to make it compressed compatible
  const pubKeyXY = Buffer.concat([Buffer.from([0x04]), pubKeyBuffer]);

  const ec = new EC('p256');
  return ec.keyFromPublic(pubKeyXY);
};

module.exports = { getKey };
