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

const assert = require('assert');
const verify = require("../src/verify");
const fs = require('fs')

const readFile = (file) => {
    try {
        return fs.readFileSync(file);
    } catch (err) {
        console.error(err)
    }
}

describe("Verification from fixtures", () => {

   describe("verify", () => {
       it('msgpack/v2.0-ecdsa-message-1.mpack should verify correctly',  () => {

           const data = readFile("./tests/fixtures/v2.0-ecdsa-message-1.mpack");
           const dataAsBase64 = Buffer.from(data).toString('base64');

           const res = verify.verify(
               "kvdvWQ7NOT+HLDcrFqP/UZWy4QVcjfmmkfyzAgg8bitaK/FbHUPeqEji0UmCSlyPk5+4mEaEiZAHnJKOyqUZxA==",
               dataAsBase64
           );

           assert(res === true);
       });

       it('msgpack/v2.0-ecdsa-message-2.mpack should verify correctly',  () => {

           const data = readFile("./tests/fixtures/v2.0-ecdsa-message-2.mpack");
           const dataAsBase64 = Buffer.from(data).toString('base64');

           const res = verify.verify(
               "9vxNdELoMlz7BnbYQMW5P5pLIFwt/90lyCxXDYYMZArcSdxdTNnJZA+D3ZsCfeWOKfKYF1UAsntHpciGJHw5wA==",
               dataAsBase64
           );

           assert(res === true);
       });

   });

});
