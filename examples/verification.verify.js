const verify = require('../src/verify');
// Use this if installed from NPM
// const verify = require("@ubirch/ubirch-protocol-verifier");

const pubKey = '9vxNdELoMlz7BnbYQMW5P5pLIFwt/90lyCxXDYYMZArcSdxdTNnJZA+D3ZsCfeWOKfKYF1UAsntHpciGJHw5wA==';
const upp = 'liPEEAUSJUETIUAgkiUAAAtc7wfEQJ3bReSUqqS20LtBVLiQTa7JQr7w/fw38RCtXNBixnnn8k/FWd+YNCbM+aQXXHlPCcyGrLlTVtLv9PYCdZ5+UzcAxCBUk+2UkhF8QFZQhKiK0ezI9RWa4Qoc5Hq3TacPIwvxYcRAMUaRx5ozZMNn7lNDqJGNpwwntrYXb//osMWA2Zc0+wRzTUvdaiqTcD2E31iR3dfsp+5N4tbyV4AqTnZcsX4wSw==';
const ok = verify.verify(pubKey, upp);

console.log(ok);
