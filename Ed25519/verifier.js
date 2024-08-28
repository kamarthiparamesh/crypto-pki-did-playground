import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020';
import fs from 'fs';

async function signData() {


    const serializedKeyPair = fs.readFileSync('./keys/key-pair.json', 'utf8');
    const keyPair = await Ed25519VerificationKey2020.from(JSON.parse(serializedKeyPair));

    const data = fs.readFileSync('./resources/data.txt', 'utf8');
    const signature = fs.readFileSync('./resources/signature.txt', 'utf8');
    let signatureValueBytes = new Uint8Array(Buffer.from(signature, 'base64'));
    const { verify } = keyPair.verifier();

    const valid = await verify({ data, signature: signatureValueBytes });

    console.log('valid', valid)
}

signData();
