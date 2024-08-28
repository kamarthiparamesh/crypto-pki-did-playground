import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020';
import { driver } from 'did-method-key';
import fs from 'fs';
import { Ed25519KeyPair } from 'crypto-ld';

async function run() {

    const serializedKeyPair = fs.readFileSync('./keys/key-pair.json', 'utf8');
    const keyPair = await Ed25519VerificationKey2020.from(JSON.parse(serializedKeyPair));

    // generate did:key elliptic curve key-pair public key
    const didKeyDriver = driver();
    //const didDocument = await didKeyDriver.get({ did: `did:key:${keyPair.fingerprint()}` })
    const publicKey = Ed25519KeyPair.fromFingerprint({ fingerprint: keyPair.fingerprint() });
    //Got did document
    const didDocument = await didKeyDriver.keyToDidDoc(publicKey)

    //save didDocument
    fs.writeFileSync('./resources/did-document.json', JSON.stringify(didDocument, null, 2));

    // Extract the DID
    const did = didDocument.id;
    console.log('DID:', did);

}

run();
