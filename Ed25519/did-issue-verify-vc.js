import { verifyCredential } from '@digitalbazaar/vc';
import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020';
import { Ed25519Signature2020 } from '@digitalbazaar/ed25519-signature-2020'
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
    const keyPair = await Ed25519VerificationKey2020.from({
        "id": signedVC.issuer,
        "publicKeyMultibase": signedVC.issuer.split('did:key:')[1]
    });

    const suite = new Ed25519Signature2020({
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