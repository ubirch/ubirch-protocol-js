import * as constants from "./config/constants";


import { box, randomBytes, hash } from "tweetnacl";
import {encode as base64Encode, decode as base64Decode} from "@stablelib/base64";
import {encode as utf8Encode, decode as utf8Decode} from "@stablelib/utf8";
import {encode as hexEncode, decode as hexDecode} from "@stablelib/hex";
import msgpack from "msgpack-lite";
import uuidParse from 'uuid-parse';

const createProtocol = function(sign, verify, secret){
    const _sign = (uuid, message) => {
       
    }

    var _appendBuffer = function(buffer1, buffer2) {
        var tmp = new Uint8Array(buffer1.length + buffer2.length);
        // console.log(tmp);
        tmp.set(buffer1, 0);
        tmp.set(buffer2, buffer1.length);
        return tmp;
      };
      
    const messagedSigned = function (uuid, type, payload){
       
        let uuidBytes = new Buffer(uuidParse.parse(uuid));
        console.log(typeof uuidBytes)
        console.log(hexEncode(msgpack.encode(uuidBytes)));
        let newMessage = [
            constants.SIGNED, // version
            uuidBytes,
            //[PREV-SIGNATURE] 
            type,
            payload,
            0 // signature
        ]
        // create new signature
        // serialize with MessagePack returns buffer 
        let encodedMessage = msgpack.encode(newMessage).slice(0,-1);
        console.log(hexEncode(encodedMessage))
        
        // create a fixed size sha512 hash
        let sha512digest = hash(new Uint8Array(encodedMessage));
        // sign this new message
        //console.log(sha512digest)
         // temporarily put key here
        // should look up key for uuid
        let signature = sign(new Uint8Array(encodedMessage), secret);
       // console.log(encodedMessage)
    
        var result = Buffer.concat([encodedMessage, msgpack.encode(new Buffer(signature))]);
        //console.log(encodedMessage)
        //console.log("--------------------")
        // console.log(result)
        // let signature = _sign(uuidBytes, encodedMessage);
        //console.log(signature);

        // replace last element in array with the signature
        
        return result;
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
