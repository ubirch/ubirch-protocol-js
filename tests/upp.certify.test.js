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

const assert = require('assert');
const uppParts = require('../src/upp-parts');
const fs = require('fs');
const Buffer = require('buffer/').Buffer; // note: the trailing slash is important!

const readFile = (file) => {
  try {
    return fs.readFileSync(file);
  } catch (err) {
    console.error(err);
  }
};
const jsonPayloadStr = '{"id":"0001","type":"donut","name":"Cake","ppu":0.55,"batters":{"batter":[{"id":1001,"type":"Regular"},{"id":1002,"type":"Chocolate"},{"id":1003,"type":"Blueberry"}]},"topping":[{"id":5001,"type":"None"},{"id":5002,"type":"Glazed"},{"id":5005,"type":"Sugar"},{"id":5007,"type":"Powdered Sugar"},{"id":5006,"type":"Chocolate with Sprinkles"},{"id":5003,"type":"Chocolate"},{"id":5004,"type":"Maple"}]}';
const expectedMsgPackPayload = "86a26964a430303031a474797065a5646f6e7574a46e616d65a443616b65a3707075cb3fe199999999999aa76261747465727381a66261747465729382a26964cd03e9a474797065a7526567756c617282a26964cd03eaa474797065a943686f636f6c61746582a26964cd03eba474797065a9426c75656265727279a7746f7070696e679782a26964cd1389a474797065a44e6f6e6582a26964cd138aa474797065a6476c617a656482a26964cd138da474797065a5537567617282a26964cd138fa474797065ae506f77646572656420537567617282a26964cd138ea474797065b843686f636f6c617465207769746820537072696e6b6c657382a26964cd138ba474797065a943686f636f6c61746582a26964cd138ca474797065a54d61706c65";
const upp = "lSLEEFjc3bREqFSCqXOVVBOUwLoAxCDS/vfhAYh2IRmRF3w9BSv13HWpuxmdIm8JyqZGcLFl2sRADHd7gzzHfymMRidmHGvXOjJ9Ej4AeHKi+EiWBMlYkScQS9BsKiQHOGlHWyNQP5r3OF9/hturj0YWNEE6LfB5ZQ==";
const hashExpected = "WFOCrSiXH+1MYYp2sL918SDsL4XLVePLCHFm11hrJqc=";
const uppWithHash = "9522c41058dcddb444a85482a97395541394c0ba00c420d2fef7e1018876211991177c3d052bf5dc75a9bb199d226f09caa64670b165dac4400c777b833cc77f298c4627661c6bd73a327d123e007872a2f8489604c9589127104bd06c2a24073869475b23503f9af7385f7f86dbab8f461634413a2df07965";
const uppWithMsgPack = "9522c41058dcddb444a85482a97395541394c0bacceec5012386a26964a430303031a474797065a5646f6e7574a46e616d65a443616b65a3707075cb3fe199999999999aa76261747465727381a66261747465729382a26964cd03e9a474797065a7526567756c617282a26964cd03eaa474797065a943686f636f6c61746582a26964cd03eba474797065a9426c75656265727279a7746f7070696e679782a26964cd1389a474797065a44e6f6e6582a26964cd138aa474797065a6476c617a656482a26964cd138da474797065a5537567617282a26964cd138fa474797065ae506f77646572656420537567617282a26964cd138ea474797065b843686f636f6c617465207769746820537072696e6b6c657382a26964cd138ba474797065a943686f636f6c61746582a26964cd138ca474797065a54d61706c65c4400c777b833cc77f298c4627661c6bd73a327d123e007872a2f8489604c9589127104bd06c2a24073869475b23503f9af7385f7f86dbab8f461634413a2df07965";
const exprectedSignedUpp = "C01:6BFPUJJVE374$6Q1W54L50NJ- 2FT1H1K-AC2IJL:8N.II$2F0L$966469UBLIAFDITQ6D28A MHC9/JCRQTMDTD.T$+O5W0EAL.04SP0$FBUQIEN9QJAUKHL5J 43STJTNFVI6:R02TBHZI8/BASI6N0%OF8$2:NTJII0 JASI KIM92FT14+E/95VY9.V57OL0/BA2CRCII5J/U3+Z5O91Z:BP7JS-0C26.S0XAB52K.8B6LJ-B2*$GAO6LQ6FLDP8E%7BMZBM:FFI97DA5KHKMIE/38ID1$R:G1AGJK733IO.Z88IF1D73-OK$8CHR$I50L0E8PTHME25Y8H52AQ*EQ1QRNF+ 3.:UTKJ XTB.84I8XN1SZ8L:FPT9$97PA6F%BHYV71I2G1A 8XSFHLE53W6AULQU7*DJ5B*VNTGJ8MBO0GLR9*40TT6.0";


describe('Certification', () => {
    describe('certify', () => {
      describe('packaging msgPack payload', () => {
        it('should create MsgPack from JSON and hash it with sha256 on base64', () => {
          const data = JSON.parse(jsonPayloadStr);

          const msgPackPayload = uppParts.createMsgPackPayloadFromJSON(data);
          const masPackPayloadInHex = uInt8Array2Hex(msgPackPayload);
          console.log(masPackPayloadInHex);
          assert(msgPackPayload !== undefined);
          assert(masPackPayloadInHex !== undefined);

          assert(masPackPayloadInHex === expectedMsgPackPayload);

          const hash = uppParts.getHashedPayload(msgPackPayload);
          console.log(hash);
          assert(hash !== undefined);
          assert(hash === hashExpected);
        });
      })
    });

  describe('create signed UPP from certification response', () => {
    it('should extract upp from successful response', () => {
      const unpackedUpp = uppParts.unpackBase64String(upp);
      assert(unpackedUpp.toString('hex') === uppWithHash);
    });

    it('should replace hash by original msgPack in upp from successful response to same result as python lib', () => {
      const data = JSON.parse(jsonPayloadStr);
      const msgPackPayload = uppParts.createMsgPackPayloadFromJSON(data);

      const uppWithMsgPackPayload = uppParts.replaceHashByMsgPackInUpp(upp, msgPackPayload);
      const uppWithMsgPackPayloadInHex = uInt8Array2Hex(uppWithMsgPackPayload);

      console.log(uppWithMsgPackPayloadInHex);
      assert(uppWithMsgPackPayloadInHex !== undefined);
      assert(uppWithMsgPackPayloadInHex === uppWithMsgPack);
    });

    it('should create same certificate from data as python lib', () => {
      const data = JSON.parse(jsonPayloadStr);
      const msgPackPayload = uppParts.createMsgPackPayloadFromJSON(data);

      const uppWithMsgPackPayload = uppParts.replaceHashByMsgPackInUpp(upp, msgPackPayload);
      const cert = uppParts.packSignedUpp(uppWithMsgPackPayload);
      console.log(cert);
      assert(cert === exprectedSignedUpp);
    });
  });

  describe('verify signed UPP from verification response', () => {
    it('should extract the right hash from valid upp', () => {
      const msgPackUpp = uppParts.unpackSignedUpp(exprectedSignedUpp);
      assert(msgPackUpp !== undefined);
      assert(msgPackUpp.length === 5);

      const msgpackPayload = uppParts.getMsgPackPayloadFromUpp(msgPackUpp);
      const msgpackPayloadInHex = uInt8Array2Hex(msgpackPayload);
      console.log(uInt8Array2Hex(msgpackPayload));
      assert(msgpackPayload !== undefined);
      assert(msgpackPayloadInHex === expectedMsgPackPayload);

      const hash = uppParts.getHashedPayload(msgpackPayload);
      console.log(hash);
      assert(hash !== undefined);
      assert(hash === hashExpected);
    });

    it('should extract the right JSON data from valid upp', () => {
      const initialData = JSON.parse(jsonPayloadStr);

      const msgPackUpp = uppParts.unpackSignedUpp(exprectedSignedUpp);
      const msgpackPayload = uppParts.getMsgPackPayloadFromUpp(msgPackUpp);
      const data = uppParts.getJSONFromMsgPackPayload(msgpackPayload);
      console.log(data);
      assert(JSON.stringify(data) === JSON.stringify(initialData));
    });
  });
});

function uInt8Array2Hex(val) {
  return Buffer.from(val).toString('hex');
}

