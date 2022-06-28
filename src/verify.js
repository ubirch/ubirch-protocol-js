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

const uppParts = require('./upp-parts');
const { isEC, isEDDSA } = require('./key');

const verifyBase = (billOfMaterials) => {
  let data;
  let signature;
  if (isEC(billOfMaterials.pk)) {
    data = billOfMaterials.sBom.signedSHA256;
    signature = billOfMaterials.sBom.signaturePoints;
  } else if (isEDDSA(billOfMaterials.pk)) {
    data = [...billOfMaterials.sBom.signedSHA512];
    signature = [...billOfMaterials.sBom.signature];
  }
  return billOfMaterials.pk.verify(data, signature);
};

const verify = (compressedKeyInBase64, uppInBase64) => {
  const bom = uppParts.billOfMaterials(compressedKeyInBase64, uppInBase64);
  return verifyBase(bom);
};

const verifyWithUUID = (uuid, compressedKeyInBase64, uppInBase64) => {
  const bom = uppParts.billOfMaterials(compressedKeyInBase64, uppInBase64);
  return bom.uuid === uuid && verifyBase(bom);
};

module.exports = { verify, verifyWithUUID };
