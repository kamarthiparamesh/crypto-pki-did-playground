import { verifyCredential } from '@digitalbazaar/vc';
import Secp256k1KeyPair from 'secp256k1-key-pair';
import EcdsaSepc256k1Signature2019 from 'ecdsa-secp256k1-signature-2019';
import fs from 'fs';
import { baseDocumentLoader } from '@affinidi/common/lib/_baseDocumentLoader/index.js'
import { getResolver } from 'key-did-resolver'
import { Resolver } from 'did-resolver'

async function getDidDoc(did) {
    const keyDidResolver = getResolver()
    const didResolver = new Resolver(keyDidResolver)
    const doc = await didResolver.resolve(did)
    return doc.didDocument;
}

async function run() {
    const signedVC = JSON.parse(fs.readFileSync('./resources/signed-vc.json', 'utf8'));

    const verificationMethod = signedVC?.proof?.verificationMethod;
    const didDocument = await getDidDoc(signedVC.issuer);
    const keyPair = await Secp256k1KeyPair.from({
        "id": signedVC.issuer,
        "publicKeyBase58": didDocument.verificationMethod[0].publicKeyBase58
    });

    const suite = new EcdsaSepc256k1Signature2019({
        key: keyPair
    });
    const controller = {
        '@context': `https://w3id.org/security/v2`,
        id: verificationMethod,
        publicKey: didDocument.verificationMethod, // this authorizes this key to be used for making assertions
        assertionMethod: [signedVC.issuer]
    };
    const verified = await verifyCredential({
        credential: signedVC,
        suite,
        controller,
        compactProof: false,
        documentLoader: baseDocumentLoader
    });
    console.log('Verifiable Credential Verified:', verified);
}


run();