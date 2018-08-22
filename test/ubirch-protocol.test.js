const protocol = require('../src/ubirch-protocol.js');

describe('the ubirch-protocol can sign and save signatures', () => {
    test('Given a message, that message can be signed', () => {
        const TEST_UUID = '6eac4d0b-16e6-4508-8c46-22e7451ea5a1'
        const EXPECTED_SIGNED = '9512b06eac4d0b16e645088c4622e7451ea5a1ccef01da0040578a5b22ceb3e1'
    							+ 'd0d0f8947c098010133b44d3b1d2ab398758ffed11507b607ed37dbbe006f645'
    							+ 'f0ed0fdbeb1b48bb50fd71d832340ce024d5a0e21c0ebc8e0e';
        let message = protocol.signMessage(TEST_UUID, 0xEF, 1);
        console.log('MESSAGE: ', message);
        console.log('EXPECTED_SIGNED: ', EXPECTED_SIGNED);
        expect(message).toEqual(EXPECTED_SIGNED);
    });

});
