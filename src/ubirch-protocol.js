
import { hash } from "tweetnacl";
import {encode as base64Encode, decode as base64Decode} from "@stablelib/base64";
import {encode as utf8Encode, decode as utf8Decode} from "@stablelib/utf8";
import {encode as hexEncode, decode as hexDecode} from "@stablelib/hex";
import msgpack from "msgpack-lite";
import uuidParse from 'uuid-parse';
import * as constants from "./config/constants";
import bops from "bops"; // Buffer in the browser

const createProtocol = function(sign, verify, secret){
    const _serialize = () => {

    }

    const _sign = (uuid, message) => {
       
        // serialize with MessagePack returns ArrayBuffer -> uint8Array
        // remove the last element, which will become the new signature
        let encoded = new Uint8Array(msgpack.encode(message).slice(0,-1));

        // returns only signature, and not the signed message
        let signature = sign(encoded, secret);
        
        let serialized = bops.join([encoded, msgpack.encode(bops.from(signature))]);

        return serialized;
    }
      
    const messagedSigned = function (uuid, type, payload){
        /***
        Create a new signed ubirch-protocol message.
            :param uuid: the uuid of the device that sends the message, part of the envelope
            :param type: a hint of the type of message sent (0-255)
            :param payload: the actual message payload
            :return: the encoded and signed message
        */
        // console.log(uuidParse.parse(uuid))
        let uuidBytes = bops.from(uuidParse.parse(uuid));
        // console.log(hexEncode(msgpack.encode(uuidBytes)));

        let message = [
            constants.SIGNED, // version
            uuidBytes,
            //[PREV-SIGNATURE] 
            type,
            payload,
            0 // signature placeholder
        ]

        // create serialized messge
        return _sign(uuid, message);
    }

    const messageVerify = function (){

    }

    return {
        messagedSigned,
        messageVerify
    };
}


module.exports = {
    createProtocol: createProtocol
}
