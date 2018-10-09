
import {encode as hexEncode, decode as hexDecode} from "@stablelib/hex";
import msgpack from "msgpack-lite";
import uuidParse from 'uuid-parse';
import * as constants from "./config/constants";

import { hash } from "tweetnacl";

const createProtocol = (sign, signmsg, verify, secret, pkey) => {
    const _signatures = {};
    var options = {codec: msgpack.createCodec({useraw: true})};

    const _unserialize = (item) => {
        return msgpack.decode(item, options);
    }
    
    const _serialize = (item) => {
        console.log(options)
        return msgpack.encode(item, options);
    }

    const _verify = (uuid, message, signature) => {
        verify(new Uint8Array(message), new Uint8Array(signature), pkey)
        return false;
    }

    const _sign = (uuid, message) => {
        // remove the last element, which will become the new signature
        const encoded = new Uint8Array(_serialize(message).slice(0,-1));
        const hashed = hash(encoded);
        console.log(hexEncode(hashed))
        console.log(hexEncode(secret))
        const signature = sign(hashed, secret); // hashes and signs encoded message
        console.log(hexEncode(signature))
        const sigBuffer = Buffer.from(signature);
        // add back new signature
        const serializedSig = Buffer.concat([encoded, _serialize(sigBuffer)]);
        // console.log(serialized)
        
        return new Uint8Array(serializedSig);
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
        let uuidBytes = Buffer.from(uuidParse.parse(uuid));
        console.log(uuidBytes.byteLength)
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

    const messageSignChained = (uuid, type, payload) => {
       
        const uuidBytes = Buffer.from(uuidParse.parse(uuid));
        console.log(uuidBytes.byteLength)
        const lastSignature = Buffer.from(new Uint8Array(64).fill(0))

        let message = [
            constants.CHAINED, // version
            uuidBytes,
            lastSignature,
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
        // console.log(message, unpacked)
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
        
        // console.log(isVerified);

        return unpacked
    }

    return {
        messageSign,
        messageSignChained,
        messageVerify
    };
}


module.exports = {
    createProtocol: createProtocol
}
