const verify = require('../src/verify');
// Use this if installed from NPM
// const verify = require("@ubirch/ubirch-protocol-verifier");

const uuid = '7af55a89-d9a0-4929-b5aa-1b1657b06a56';
const pubKey = 'GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==';
const upp = 'liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==';

const ok = verify.verifyWithUUID(uuid, pubKey, upp);

console.log(ok);
