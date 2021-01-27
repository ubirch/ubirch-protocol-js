# Ubirch Protocol Verifier

This library offers basic functionality to support Ubirch Protocol Verification for ECDSA Keys. It has
three fundamental functions: _verify_, _verify with UUID_ and _verify with Key service_.

The verification can be used directly on the browser or in a node application.

`NOTE`: `The examples might change as soon as we add the lib to a package registry.`

1. [Install](#install)
2. [Run Tests](#run-tests)
3. [Build](#build)   
4. [Verify](#verify)
5. [Verify With UUID Check](#verifywithuuid)
6. [Verify With Key Service](#verifyfromkeyservice)

## Install

`npm install`

## Run Tests

`npm run test:mocha`

## Build

`npm run build`

## Verify

### Example on Browser

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>UPP Verification ::: verify</title>
</head>
<body>
<p id="pubkey"></p>
<p id="upp"></p>
<p id="res"></p>

<script src="../dist/main.js"></script>
<script>
    const pubKey = "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==";
    const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==";
    const ok = window.UPP.Verification.verify(pubKey, upp);

    document.getElementById("pubkey").innerText = pubKey;
    document.getElementById("upp").innerText = upp;
    document.getElementById("res").innerText = ok;
</script>
</body>
</html>

```

### Example on Node APP

```js
const verify = require("../src/verify");

const pubKey = "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==";
const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==";
const ok = verify.verify(pubKey, upp);

console.log(ok);
```

## verifyWithUUID

### Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>UPP Verification ::: verifyWithUUID</title>
</head>
<body>
<p id="uuid"></p>
<p id="pubkey"></p>
<p id="upp"></p>
<p id="res"></p>

<script src="../dist/main.js"></script>
<script>
    const uuid = '7af55a89-d9a0-4929-b5aa-1b1657b06a56';
    const pubKey = "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==";
    const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==";
    const ok = window.UPP.Verification.verifyWithUUID(uuid, pubKey, upp);

    document.getElementById("uuid").innerText = uuid;
    document.getElementById("pubkey").innerText = pubKey;
    document.getElementById("upp").innerText = upp;
    document.getElementById("res").innerText = ok;

</script>
</body>
</html>
```

### Example on Node APP

```js
const verify = require("../src/verify");

const uuid = '7af55a89-d9a0-4929-b5aa-1b1657b06a56';
const pubKey = "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==";
const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==";

const ok = verify.verifyWithUUID(uuid, pubKey, upp);

console.log(ok);
```

## verifyFromKeyService

### Example

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>UPP Verification ::: verifyFromKeyService</title>
    </head>
    <body>
        <p>UUID: <span id="uuid"></span></p>
        <p>UPP: <span id="upp"></span></p>
        <p>Validation:<span id="res"></span></p>

        <script src="../dist/main.js"></script>
        <script>
            const stage = "prod";
            const uuid = '7af55a89-d9a0-4929-b5aa-1b1657b06a56';
            const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==";
            window.UPP.Verification.verifyFromKeyService(stage, uuid, upp).then((res) => {
                document.getElementById("uuid").innerText = uuid
                document.getElementById("upp").innerText = upp
                document.getElementById("res").innerText = res
            });
        </script>
    </body>
</html>
```

### Example on Node APP

```js
const verify = require("../src/verify-with-key-service");

const stage = "prod";
const uuid = '7af55a89-d9a0-4929-b5aa-1b1657b06a56';
const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==";

verify.verifyFromKeyService(stage, uuid, upp).then((res) => {
    console.log(res);
});

```

