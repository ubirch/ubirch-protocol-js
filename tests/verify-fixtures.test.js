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

   describe("msgpack/v2.0-ecdsa-message-1.mpack", () => {
       it('should verify correctly',  () => {

           const data = readFile("./tests/fixtures/v2.0-ecdsa-message-1.mpack");
           const dataAsBase64 = Buffer.from(data).toString('base64');

           const res = verify.verify(
               "kvdvWQ7NOT+HLDcrFqP/UZWy4QVcjfmmkfyzAgg8bitaK/FbHUPeqEji0UmCSlyPk5+4mEaEiZAHnJKOyqUZxA==",
               dataAsBase64
           )

           assert(res === true)
       });
   });

    describe("msgpack/v2.0-ecdsa-message-2.mpack", () => {
        it('should verify correctly',  () => {

            const data = readFile("./tests/fixtures/v2.0-ecdsa-message-2.mpack");
            const dataAsBase64 = Buffer.from(data).toString('base64');

            const res = verify.verify(
                "9vxNdELoMlz7BnbYQMW5P5pLIFwt/90lyCxXDYYMZArcSdxdTNnJZA+D3ZsCfeWOKfKYF1UAsntHpciGJHw5wA==",
                dataAsBase64
            )

            assert(res === true)
        });
    });


});
