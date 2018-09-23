
import { hash } from "tweetnacl";
import {encode as base64Encode, decode as base64Decode} from "@stablelib/base64";
import {encode as utf8Encode, decode as utf8Decode} from "@stablelib/utf8";
import {encode as hexEncode, decode as hexDecode} from "@stablelib/hex";
import msgpack from "msgpack-lite";
import uuidParse from 'uuid-parse';
import * as constants from "./config/constants";
import bops from "bops"; // Buffer in the browser

const createProtocol = (sign, signmsg, verify, secret, pkey) => {
    const _unserialize = (item) => {
      
        return msgpack.decode(item);
    }
    const _serialize = (item) => {
        return msgpack.encode(item);
    }

    const _verify = (uuid, message, signature) => {
        verify(new Uint8Array(message), new Uint8Array(signature), pkey)
        return false;
    }

    const _sign = (uuid, message) => {
        // remove the last element, which will become the new signature
        const encoded = new Uint8Array(_serialize(message).slice(0,-1));
        const signature = sign(encoded, secret); // hashes and signs encoded message
        const sigBuffer = bops.from(signature);
        // add back new signature
        const serializedSig = bops.join([encoded, _serialize(sigBuffer)]);
        // console.log(serialized)
        
        return serializedSig;
    }
      
    const messageSign = (uuid, type, payload) => {
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
        return  _sign(uuid, message)
    }

    const messageVerify = (message) => {
        /***
            Verify the integrity of the message and decode the contents.
            Throws an exception if the message is not verifiable.
            :param message: the msgpack encoded message
            :return: the decoded message
        */
        let unpacked = _unserialize(message);
        console.log(unpacked)
        // console.log(message, bops.from(message), unpacked. typeof )
        // console.log("decoded", msgpack.decode(bops.from(message)));
        // console.log(hexEncode(bops.from(message)))
        let uuid = uuidParse.unparse(unpacked[1]);

        let signature = "";
        if(unpacked[0] == constants.SIGNED){
            // message is signed but does is not chained
            signature = unpacked[4]
        } else {
            // message includes signature of previous signed message
            signature = unpacked[5]
        }
        // last 64 bytes of the message / 67 bytes hashed with SHA512 is the signature
        var isVerified = _verify(uuid, message.slice(0,-67), signature);
        
        console.log(isVerified);

        return unpacked
    }

    return {
        messageSign,
        messageVerify
    };
}


module.exports = {
    createProtocol: createProtocol
}
