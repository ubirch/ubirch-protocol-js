const verify = require("../src/verify-with-key-service");

const stage = "prod";
const uuid = '7af55a89-d9a0-4929-b5aa-1b1657b06a56';
const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==";

verify.verifyFromKeyService(stage, uuid, upp).then((res) => {
    console.log(res);
});
