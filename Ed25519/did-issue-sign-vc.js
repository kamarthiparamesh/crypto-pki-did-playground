import { issue } from '@digitalbazaar/vc';
import { Ed25519VerificationKey2020 } from '@digitalbazaar/ed25519-verification-key-2020';
import { Ed25519Signature2020 } from '@digitalbazaar/ed25519-signature-2020'
import fs from 'fs';
import { baseDocumentLoader } from '@affinidi/common/lib/_baseDocumentLoader/index.js'


async function run() {
    // Load the key pair from the file
    const keyPairData = JSON.parse(fs.readFileSync('./keys/key-pair-private.json', 'utf8'));
    const keyPair = await Ed25519VerificationKey2020.from(keyPairData);
    // Generate the DID from the key pair
    const did = `did:key:${keyPair.fingerprint()}`;
    keyPair.id = `${did}`;

    // Sample unsigned credential
    const credential = {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://schema.affinidi.com/DocumentV1-3.jsonld"
        ],
        "id": "claimId:jHyLauwDtGeOYRTXNhx8X",
        "type": [
            "VerifiableCredential",
            "Document"
        ],
        "holder": {
            "id": "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i"
        },
        "issuanceDate": new Date().toISOString(),
        "issuer": did,
        "credentialSubject": {
            "documentType": "PAN",
            "documentId": "ABCDE1234L",
            "documentIssuedOn": "28-12-2010",
            "displayName": "Paramesh K",
            "issuedBy": "Govt of India",
            "issuedOn": "28-12-2010",
            "version": 1
        },
        "credentialSchema": {
            "type": "JsonSchemaValidator2018",
            "id": "https://schema.affinidi.com/DocumentV1-3.json"
        }
    };

    const suite = new Ed25519Signature2020({
        key: keyPair
    });

    const signedVC = await issue({ credential, suite, documentLoader: baseDocumentLoader });
    //console.log(JSON.stringify(signedVC, null, 2));
    fs.writeFileSync('./resources/signed-vc.json', JSON.stringify(signedVC, null, 2));
    console.log('Signed VC written to file')
}


run();