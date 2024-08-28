import Secp256k1KeyPair from 'secp256k1-key-pair';

import fs from 'fs';

async function signData() {


    const serializedKeyPair = fs.readFileSync('./keys/key-pair-private.json', 'utf8');
    const keyPair = await Secp256k1KeyPair.from(JSON.parse(serializedKeyPair));

    const { sign } = keyPair.signer();

    const data = fs.readFileSync('./resources/data.txt', 'utf8');
    const signatureValueBytes = await sign({ data });
    const signature = Buffer.from(signatureValueBytes.buffer).toString('base64');
    console.log('Signature', signature)
    fs.writeFileSync('./resources/signature.txt', signature);
    console.log('signature written to file')
}

signData();
