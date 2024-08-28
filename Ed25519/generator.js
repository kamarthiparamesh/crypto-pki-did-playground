import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020';
import fs from 'fs';

async function run() {
    // Generate a key pair
    const keyPair = await Ed25519VerificationKey2020.generate();
    console.log('keyPair:', keyPair);

    //save it with public & private key
    fs.writeFileSync('./keys/key-pair-private.json', JSON.stringify(keyPair, null, 2));

    const keyPairJustPK = keyPair.export({ publicKey: true });
    fs.writeFileSync('./keys/key-pair.json', JSON.stringify(keyPairJustPK, null, 2));

}

run();
