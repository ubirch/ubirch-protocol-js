const verify = require('../src/verify-with-key-service');
// Use this if installed from NPM
// const verify = require("@ubirch/ubirch-protocol-verifier");

const stage = 'dev';
const uuid = 'c3e59fee-c409-4ab7-9aae-b19e62f4af9b';
const upp = 'lSLEEMPln+7ECUq3mq6xnmL0r5sAxCCzns3jSfHQrt6sQA62/GD6Dv2cYyINCxzAU/cT3UOZa8RAMkNE2PGYIw63/lmbLNpAE/OIAO2WrjNQXqt9mszz0IcdGwZHocCyCCzj7LpP9WcRPIN1LdvS/tsLBWWgEsXFAA==';

verify.verifyFromKeyService(stage, uuid, upp).then((res) => {
  console.log(res);
});
