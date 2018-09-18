const protocol = require('../src/ubirch-protocol.js');

import { sign } from "tweetnacl";
import {encode as base64encode, decode as base64decode} from "@stablelib/base64";
import {encode as utf8encode, decode as utf8decode} from "@stablelib/utf8";
import {encode as hexEncode, decode as hexDecode} from "@stablelib/hex";

describe('the ubirch-protocol can sign and save signatures', () => {
    test('Given a message, that message can be signed', () => {
        let TEST_PRIV = "a6abdc5466e0ab864285ba925452d02866638a8acb5ebdc065d2506661301417";
        let TEST_PUBL = "b12a906051f102881bbb487ee8264aa05d8d0fcc51218f2a47f562ceb9b0d068";

        TEST_PRIV = TEST_PUBL + TEST_PRIV;
        const TEST_UUID = '6eac4d0b-16e6-4508-8c46-22e7451ea5a1'
        const EXPECTED_SIGNED = '9512b06eac4d0b16e645088c4622e7451ea5a1ccef01da0040578a5b22ceb3e1'
    							+ 'd0d0f8947c098010133b44d3b1d2ab398758ffed11507b607ed37dbbe006f645'
                                + 'f0ed0fdbeb1b48bb50fd71d832340ce024d5a0e21c0ebc8e0e';
        
                                
        const keys = sign.keyPair();
        console.log("keylenght", hexDecode(TEST_PRIV).length)
        const uBirchProtocol = protocol.createProtocol(sign, sign.detached.verify, hexDecode(TEST_PRIV));
        const message = uBirchProtocol.messagedSigned(TEST_UUID, 0xEF, 1); 
        // create stub methods to pass in
        expect(hexEncode(message)).toEqual(EXPECTED_SIGNED);               
    });

});
