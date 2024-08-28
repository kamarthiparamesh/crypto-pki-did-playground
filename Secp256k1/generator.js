import EcdsaSepc256k1Signature2019 from 'ecdsa-secp256k1-signature-2019';
import Secp256k1KeyPair from 'secp256k1-key-pair';
import fs from 'fs';

async function run() {
    // Generate a key pair
    const keyPair = await Secp256k1KeyPair.generate();
    console.log('keyPair:', keyPair);

    //save it with public & private key
    fs.writeFileSync('./keys/key-pair-private.json', JSON.stringify(keyPair, null, 2));

    delete keyPair.privateKeyBase58
    fs.writeFileSync('./keys/key-pair.json', JSON.stringify(keyPair, null, 2));

}

run();
