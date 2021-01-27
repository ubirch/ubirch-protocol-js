# Ubirch Protocol Verifier

This library offers basic functionality to support Ubirch Protocol Verification for ECDSA Keys. It has
three fundamental functions: _verify_, _verify with UUID_ and _verify with Key service_.

1. [Description](#description)
1. [Install from NPM](#installing-from-npm)
2. [Building from Sources](#building-from-sources)
3. [Examples](#examples)
    1. [Verify](#verify)
    2. [Verify With UUID Check](#verifywithuuid)
    3. [Verify With Key Service](#verifyfromkeyservice)

## Interface Description

1. **_verify_**: The verification can be used directly on the browser or in a node application.
2. **_verify with UUID_**: This function verifies that the UPP was signed by the provided ECDSA Pubkey && that the UPP's device id/identity id matches the provided UUID.
3. **_verify with Key service_**: This function retrieves the list of available public keys for a device. This list is obtained from the Ubirch Identity Service. Then UPP is verified against this list of pubkeys.
This function verifies that the UPP was signed by the provided ECDSA Pubkey.
    
## Installing from NPM.

`npm i @ubirch/ubirch-protocol-verifier`

## Building from sources.


`npm install`

`npm run test:mocha`

`npm run build` This will bundle a js file for the browser.

## Examples

Note: The manner we use in this example this lib is not the only one and it depends on the project you are working with.
That means that the verification object added to the Window object can be ignored.

### Verify

This function verifies that the UPP was signed by the provided ECDSA Pubkey.

#### Example on Browser

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

<script src="../dist/ubirch-protocol-verifier.min.js"></script>
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

#### Example on Node APP

```js
const verify = require("../src/verify");
// Use this if installed from NPM
// const verify = require("@ubirch/ubirch-protocol-verifier"); 

const pubKey = "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==";
const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==";
const ok = verify.verify(pubKey, upp);

console.log(ok);
```

### verifyWithUUID

This function verifies that the UPP was signed by the provided ECDSA Pubkey && that the UPP's device id/identity id matches the provided UUID.

#### Example

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

<script src="../dist/ubirch-protocol-verifier.min.js"></script>
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

#### Example on Node APP

```js
// Use this if installed from NPM
// const verify = require("@ubirch/ubirch-protocol-verifier");

const uuid = '7af55a89-d9a0-4929-b5aa-1b1657b06a56';
const pubKey = "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==";
const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==";

const ok = verify.verifyWithUUID(uuid, pubKey, upp);

console.log(ok);
```

### verifyFromKeyService

This function retrieves the list of available public keys for a device. This list is obtained from the Ubirch Identity Service. Then UPP is verified
against this list of pubkeys.

This function verifies that the UPP was signed by the provided ECDSA Pubkey.



#### Example

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

        <script src="../dist/ubirch-protocol-verifier.min.js"></script>
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

#### Example on Node APP

```js
// Use this if installed from NPM
// const verify = require("@ubirch/ubirch-protocol-verifier");

const stage = "prod";
const uuid = '7af55a89-d9a0-4929-b5aa-1b1657b06a56';
const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg==";

verify.verifyFromKeyService(stage, uuid, upp).then((res) => {
    console.log(res);
});

```

