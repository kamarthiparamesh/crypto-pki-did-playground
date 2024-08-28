import Secp256k1KeyPair from 'secp256k1-key-pair';
import { driver } from 'did-method-key';
import fs from 'fs';
import { Ed25519KeyPair } from 'crypto-ld';

async function run() {

    const serializedKeyPair = fs.readFileSync('./keys/key-pair.json', 'utf8');
    const keyPair = await Secp256k1KeyPair.from(JSON.parse(serializedKeyPair));

    const didKeyDriver = driver();
    //Got did document
    const didDocument = await didKeyDriver.keyToDidDoc(keyPair)

    //save didDocument
    fs.writeFileSync('./resources/did-document.json', JSON.stringify(didDocument, null, 2));

    console.log('DID:', didDocument.id);

}

run();
