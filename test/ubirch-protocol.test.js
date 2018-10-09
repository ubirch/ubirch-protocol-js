const protocol = require('../src/ubirch-protocol.js');
import * as constants from "../src/config/constants.js";

import { sign } from "tweetnacl";
import {encode as hexEncode, decode as hexDecode} from "@stablelib/hex";
import uuidParse from 'uuid-parse';

describe('the ubirch-protocol can sign and save signatures', () => {
    const TEST_PRIV = 'a6abdc5466e0ab864285ba925452d02866638a8acb5ebdc065d2506661301417';
    const TEST_PUBL = 'b12a906051f102881bbb487ee8264aa05d8d0fcc51218f2a47f562ceb9b0d068';
    const TEST_UUID = '6eac4d0b-16e6-4508-8c46-22e7451ea5a1'; // hex
    // const key = hexDecode(TEST_PUBL + TEST_PRIV);
    
    const key = sign.keyPair.fromSeed(hexDecode(TEST_PRIV))

    // new encoding
    const expectedSigned = hexDecode('9512b06eac4d0b16e645088c4622e7451ea5a1ccef01da0040578a5b22ceb3e1d0d0f8947c098010133b44d3b1d2ab398758ffed11507b607ed37dbbe006f645f0ed0fdbeb1b48bb50fd71d832340ce024d5a0e21c0ebc8e0e');
    // old msgpack encoding
    const expectedChained = [
        hexDecode("9613b06eac4d0b16e645088c4622e7451ea5a1da004000000000000000000000" +
        "0000000000000000000000000000000000000000000000000000000000000000" +
        "00000000000000000000000000000000000000000000ccee01da00408e58872a" +
        "8a3baa13ec28dd9cf22957f28fb4d2e7e048f2d3f61fe2c7f45f3c46d4b4f95a" +
        "eae3dacf0359f15617492e82fb21635b8ff6a420dc61dd3a16f85c09"),
        hexDecode("9613b06eac4d0b16e645088c4622e7451ea5a1da00408e58872a8a3baa13ec28" +
        "dd9cf22957f28fb4d2e7e048f2d3f61fe2c7f45f3c46d4b4f95aeae3dacf0359" +
        "f15617492e82fb21635b8ff6a420dc61dd3a16f85c09ccee02da0040da8777b7" +
        "2b80d9708e6956c1a2164f5f04f085d5595787faf3521672bcc172071cfe90b3" +
        "37cc94118258ede362cf1d3e078b9ae2aff4e038e6f8c8658e8f530e"),
        hexDecode("9613b06eac4d0b16e645088c4622e7451ea5a1da0040da8777b72b80d9708e69" +
        "56c1a2164f5f04f085d5595787faf3521672bcc172071cfe90b337cc94118258" +
        "ede362cf1d3e078b9ae2aff4e038e6f8c8658e8f530eccee03da0040a9bed504" +
        "5af0379bd2e999e51a8d97e459517bc539a576a3f0a3c9f109d5b737ab0535d7" +
        "8418e9d9d65188fcfb2c70a020237b451366dd8dcacd1b5b23cd4609")
    ];

    const pyExpectedSigned = hexDecode(
        "9512b06eac4d0b16e645088c4622e7451ea5a1ccef01da0040578a5b22ceb3e1" +
        "d0d0f8947c098010133b44d3b1d2ab398758ffed11507b607ed37dbbe006f645" +
        "f0ed0fdbeb1b48bb50fd71d832340ce024d5a0e21c0ebc8e0e");

    const manualstuff =  hexDecode("9613c4106eac4d0b16e645088c4622e7451ea5a1c44000000000000000000000" +
    "0000000000000000000000000000000000000000000000000000000000000000" +
    "00000000000000000000000000000000000000000000ccee01c4408e58872a" +
    "8a3baa13ec28dd9cf22957f28fb4d2e7e048f2d3f61fe2c7f45f3c46d4b4f95a" +
    "eae3dacf0359f15617492e82fb21635b8ff6a420dc61dd3a16f85c09")

    const uBirchProtocol = protocol.createProtocol(sign.detached, sign, sign.detached.verify, key.secretKey, hexDecode(TEST_PUBL));
        
    test('Given a message, it message can be signed', () => {           
        const message = uBirchProtocol.messageSign(TEST_UUID, 0xEF, 1); 
        // console.log(hexEncode(expectedSigned))
        // console.log(hexEncode(message))
        expect(message).toEqual(expectedSigned);               
    });

    test('Given a message, it message can be verified', () => {
        const unpacked = uBirchProtocol.messageVerify(expectedSigned); 
        expect(unpacked[0]).toEqual(constants.SIGNED);
        expect(uuidParse.unparse(unpacked[1])).toEqual(TEST_UUID);
        expect(0xEF).toEqual(unpacked[2]);
        expect(1).toEqual(unpacked[3]);
    });

    test('Given a chained message, it message can be signed', () => {
        const message = uBirchProtocol.messageSignChained(TEST_UUID, 0xEE, 1); 
        // console.log(msgpack.decode(hexDecode("9613b06eac4d0b16e645088c4622e7451ea5a1da004000000000000000000000" +
        // "0000000000000000000000000000000000000000000000000000000000000000" +
        // "00000000000000000000000000000000000000000000ccee01da00408e58872a" +
        // "8a3baa13ec28dd9cf22957f28fb4d2e7e048f2d3f61fe2c7f45f3c46d4b4f95a" +
        // "eae3dacf0359f15617492e82fb21635b8ff6a420dc61dd3a16f85c09")))
        console.log(hexEncode(message))
        console.log(hexEncode(expectedChained[0]))
        // console.log(hexEncode(expectedChained[0]), hexEncode(message))
        expect(message).toEqual(expectedChained[0]);
        
        // expect(uuidParse.unparse(unpacked[1])).toEqual(TEST_UUID);

    });

    // test exected verion of msgpack

});
