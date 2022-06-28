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
const verify = require("../src/upp");

describe("Verification", () => {

    describe("upp", () => {
        it('should get details from upp', () => {
            const uppHash = "liPEEM+T+e6L9EzBtxV79B2I5hbEQLKeDjxuX6RTp6/kKnsJR+cd3exsAqA/8oJXdYjzVvfWG3I3QXeqzTdAgJj8No6sL0ltaSGWjzEwBAy+fx+ZdCkAxCB8OqIKiOGsBRJoM8hSLnaawKFfIHdVFYVYBP5XRaEWJMRAPYfV3BJ4goY6HUxSNcB6Wu48Y+5iRqsuRdUT4dlidzaD9bjub7DxN75sXzf5uOgn26lZ1asuPsfKPWaYuciXTQ==";
            const upp = verify.tools.upp(uppHash);
            assert(upp !== undefined);
            const uuid = verify.tools.getUUIDFromUpp(upp);
            assert(uuid !== undefined);
            assert(uuid === "cf93f9ee-8bf4-4cc1-b715-7bf41d88e616");
        });
    });

    describe("verify", () => {

        describe("ec", () => {

            it('should verify correctly', () => {
                const res = verify.verify(
                    "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==",
                    "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==")
                assert(res === true);
            });

            it('should fail when upp signed with other key', () => {
                const res = verify.verify(
                    "4KJrbh6o3zWu/4jZpTTHdR+tkHQLIpWoHYBrM/Z7vG96qfn0ovmNSCWPbBDJE5qv/BwzmpL1rhvmAoGpUrOV8A==",
                    "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==")
                assert(res === false);
            });

        });

        describe("ed25519", () => {

            it('should verify correctly', () => {
                const res = verify.verify(
                    "1cUiOaf2ULj4nEYd6W1t+RvYLUx+GQfqHnt7hnbBAek=",
                    "lSLEEMPln+7ECUq3mq6xnmL0r5sAxCCzns3jSfHQrt6sQA62/GD6Dv2cYyINCxzAU/cT3UOZa8RAMkNE2PGYIw63/lmbLNpAE/OIAO2WrjNQXqt9mszz0IcdGwZHocCyCCzj7LpP9WcRPIN1LdvS/tsLBWWgEsXFAA==")
                assert(res === true);
            });

            it('should fail when upp signed with other key', () => {
                const res = verify.verify(
                    "9+qK22p5hGIsogzxIm1rM3lWCnHGDonWwszhjTkUsBM=",
                    "lSLEEMPln+7ECUq3mq6xnmL0r5sAxCCzns3jSfHQrt6sQA62/GD6Dv2cYyINCxzAU/cT3UOZa8RAMkNE2PGYIw63/lmbLNpAE/OIAO2WrjNQXqt9mszz0IcdGwZHocCyCCzj7LpP9WcRPIN1LdvS/tsLBWWgEsXFAA==")
                assert(res === false);
            });

        });

    });

    describe("verifyWithUUID", () => {

        describe("ec", () => {

            it('should verifyWithUUID correctly', () => {
                const res = verify.verifyWithUUID(
                    "7af55a89-d9a0-4929-b5aa-1b1657b06a56",
                    "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==",
                    "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==")
                assert(res === true);
            });

            it('should verifyWithUUID with false when UUID do not match', () => {
                const res = verify.verifyWithUUID(
                    "7af55a89-d9a0-4929-b5aa-1b1657b00a56",
                    "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==",
                    "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==")
                assert(res === false);
            });

        });

        describe("ed25519", () => {

            it('should verify correctly', () => {
                const res = verify.verifyWithUUID(
                    "c3e59fee-c409-4ab7-9aae-b19e62f4af9b",
                    "1cUiOaf2ULj4nEYd6W1t+RvYLUx+GQfqHnt7hnbBAek=",
                    "lSLEEMPln+7ECUq3mq6xnmL0r5sAxCCzns3jSfHQrt6sQA62/GD6Dv2cYyINCxzAU/cT3UOZa8RAMkNE2PGYIw63/lmbLNpAE/OIAO2WrjNQXqt9mszz0IcdGwZHocCyCCzj7LpP9WcRPIN1LdvS/tsLBWWgEsXFAA==")
                assert(res === true);
            });

            it('should fail when upp signed with other key', () => {
                const res = verify.verifyWithUUID(
                    "c3e59fee-c409-4ab7-9aae-b19e62f4af9b",
                    "9+qK22p5hGIsogzxIm1rM3lWCnHGDonWwszhjTkUsBM=",
                    "lSLEEMPln+7ECUq3mq6xnmL0r5sAxCCzns3jSfHQrt6sQA62/GD6Dv2cYyINCxzAU/cT3UOZa8RAMkNE2PGYIw63/lmbLNpAE/OIAO2WrjNQXqt9mszz0IcdGwZHocCyCCzj7LpP9WcRPIN1LdvS/tsLBWWgEsXFAA==")
                assert(res === false);
            });

        });

    });

});
