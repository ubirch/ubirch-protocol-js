"use strict";

const assert = require('assert');
const verify = require("../src/verify");

describe("Verification", () => {

   describe("verify", () => {
       it('should verify correctly',  () => {
           const res = verify.verify(
               "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==",
           "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==")
           assert(res === true)
       });
   });

    describe("verify", () => {
        it('should fail when upp signed with other key',  () => {
            const res = verify.verify(
                "4KJrbh6o3zWu/4jZpTTHdR+tkHQLIpWoHYBrM/Z7vG96qfn0ovmNSCWPbBDJE5qv/BwzmpL1rhvmAoGpUrOV8A==",
                "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==")
            assert(res === false)
        });
    });

    describe("verifyWithUUID", () => {
        it('should verifyWithUUID correctly',  () => {
            const res = verify.verifyWithUUID(
                "7af55a89-d9a0-4929-b5aa-1b1657b06a56",
                "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==",
                "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==")
            assert(res === true)
        });
    });

    describe("verifyWithUUID", () => {
        it('should verifyWithUUID with false when UUID do not match',  () => {
            const res = verify.verifyWithUUID(
                "7af55a89-d9a0-4929-b5aa-1b1657b00a56",
                "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==",
                "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==")
            assert(res === false)
        });
    });

});
