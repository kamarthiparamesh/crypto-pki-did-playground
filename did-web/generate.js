
import { utils } from './utils.js'
import fs from 'fs';

async function run() {

    const did = `did:web:localhost`;  // https://localhost/.well-known/did.json
    //const did = `did:web:localhost:path1:path2`;  // https://localhost/path1/path2/did.json
    //const did = `did:web:example-domain.com:user:paramesh` // https://example-domain.com/user/paramesh/did.json

    //You can generate new RSA Keypair
    //const keyPair = await utils.generateKeys();
    //fs.writeFileSync('./keys/key-pair-private.json', JSON.stringify(keyPair, null, 2));

    //Use already existing one
    const keyPair = {
        "publicKey": fs.readFileSync("../keys/public_key.pem", { encoding: "utf8" }),
        "privateKey": fs.readFileSync("../keys/private_key.pem", { encoding: "utf8" }),
        "keyId": "key-0"
    };


    const data = {
        did,
        verificationMethod: `${did}#${keyPair.keyId || "key-0"}`,
        publicKey: keyPair.publicKey
    }
    const didDocument = await utils.generateDidJson(data);
    fs.writeFileSync('./resources/did-document.json', JSON.stringify(didDocument, null, 2));


}

run();