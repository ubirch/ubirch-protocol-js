#UPP Verifier

##Install

`npm install -g browserify`

`npm install`

##Add Verification Object to DOM

###Normal
`browserify main-browser.js -o build/main-browser-bundle.js`

###Uglified
`browserify -p tinyify main-browser.js -o build/main-browser-bundle.min.js`

###Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>UPP Verification</title>
    <script src="build/main-browser-bundle.js"></script>
</head>
<body>
    <p id="pubkey"></p>
    <p id="upp"></p>
    <p id="res"></p>

    <script>
        const pubKey = "GdbPJkVS15N0SIMQKRAuhRglL2OTlr/Q6TPDMqAEFWoazN/avO5/KO0iSjOKrUa7qWgiEB8Zw/QMzn8y1XB51Q==";
        const upp = "liPEEHr1WonZoEkptaobFlewalbEQCI+PfqAymyGmdyszoDVDvQwTTs9aSLfDwFr163jyiXpKfpaddpkR6g7DtfaCz/4IJyRLostPO2PWsgwigqW9G8AxCB01pV0Aw5ngFA9RXBpJ8nu+dT8chghOj1goS4O38ZWisRATv0reU41YtXKJp6lpXh5Jt5buq4n17sBbVm3GLyiAeTmSGuAEQcxbE7j7UhOQLg8uR1Oj/Ql2tbKmhRCzR5jWg=="
        const ok = window.UPP.Verification.verify(pubKey, upp)

        document.getElementById("pubkey").innerText = pubKey
        document.getElementById("upp").innerText = upp
        document.getElementById("res").innerText = ok

    </script>
</body>

</html>
```


