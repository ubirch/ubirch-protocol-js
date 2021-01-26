"use strict";

const verify = require("./verify");
const {verifyFromKeyService} = require("./verify-with-key-service");

window.UPP = {};
window.UPP.Verification = verify;
window.UPP.Verification.verifyFromKeyService = {};
window.UPP.Verification.verifyFromKeyService = verifyFromKeyService;

