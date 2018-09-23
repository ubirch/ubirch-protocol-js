const protocol = require('../src/ubirch-protocol.js');
import * as constants from "../src/config/constants.js";

import { sign } from "tweetnacl";
import {encode as base64encode, decode as base64decode} from "@stablelib/base64";
import {encode as utf8encode, decode as utf8decode} from "@stablelib/utf8";
import {encode as hexEncode, decode as hexDecode} from "@stablelib/hex";
import uuidParse from 'uuid-parse';

describe('the ubirch-protocol can sign and save signatures', () => {
   
    test('Given a message, it message can be signed', () => {
        const TEST_PRIV = "a6abdc5466e0ab864285ba925452d02866638a8acb5ebdc065d2506661301417";
        const TEST_PUBL = "b12a906051f102881bbb487ee8264aa05d8d0fcc51218f2a47f562ceb9b0d068";

        const key = TEST_PUBL + TEST_PRIV;
        const TEST_UUID = '6eac4d0b-16e6-4508-8c46-22e7451ea5a1'
        const expectedSigned = "9512C4106EAC4D0B16E645088C4622E7451EA5A1CCEF01C440C9A961850F0707A14EFF9E5D8F474FED7673A6C047801A08CCD03EE6E31A02C361850669A990C86D0F7F1627C8202B1888C8921645C5515D5BAFD1172136620F"
                    //^^ this is a signature - does it include the message             
        const uBirchProtocol = protocol.createProtocol(sign.detached, sign, sign.detached.verify, hexDecode(key));
        const message = uBirchProtocol.messageSign(TEST_UUID, 0xEF, 1); 

        expect(hexEncode(message)).toEqual(expectedSigned);               
    });

    test('Given a message, it message can be verified', () => {
        const TEST_PRIV = "a6abdc5466e0ab864285ba925452d02866638a8acb5ebdc065d2506661301417";
        const TEST_PUBL = "b12a906051f102881bbb487ee8264aa05d8d0fcc51218f2a47f562ceb9b0d068";
        const TEST_UUID = '6eac4d0b-16e6-4508-8c46-22e7451ea5a1'
        const key = TEST_PUBL + TEST_PRIV;
        const expectedSigned = "9512C4106EAC4D0B16E645088C4622E7451EA5A1CCEF01C440C9A961850F0707A14EFF9E5D8F474FED7673A6C047801A08CCD03EE6E31A02C361850669A990C86D0F7F1627C8202B1888C8921645C5515D5BAFD1172136620F"
        
        const uBirchProtocol = protocol.createProtocol(sign.detached, sign, sign.detached.verify, hexDecode(key), hexDecode(TEST_PUBL));
        const unpacked = uBirchProtocol.messageVerify(hexDecode(expectedSigned)); 
        expect(unpacked[0]).toEqual(constants.SIGNED);
        expect(uuidParse.unparse(unpacked[1])).toEqual(TEST_UUID);

        // test other fields
    });

});
