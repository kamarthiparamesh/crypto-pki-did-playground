import { issue } from '@digitalbazaar/vc';
import Secp256k1KeyPair from 'secp256k1-key-pair';
import EcdsaSepc256k1Signature2019 from 'ecdsa-secp256k1-signature-2019';
import fs from 'fs';
import { baseDocumentLoader } from '@affinidi/common/lib/_baseDocumentLoader/index.js'
import jsld from 'jsonld-signatures';

const SECURITY_CONTEXT_URL = 'https://w3id.org/security/v2'
const contextUrl = "https://w3id.org/security/v2";
async function run() {
    // Load the key pair from the file
    const keyPairData = JSON.parse(fs.readFileSync('./keys/key-pair-private.json', 'utf8'));
    const keyPair = await Secp256k1KeyPair.from(keyPairData);
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

    const suite = new EcdsaSepc256k1Signature2019({
        key: keyPair
    });

    const controller = {
        //'@context': SECURITY_CONTEXT_URL,
        id: 'controller_id',
        publicKey: [{
            //'@context': SECURITY_CONTEXT_URL,
            id: did,
            type: keyPair.type,
            controller: did,
        }],
        assertionMethod: [did]
    };
    const purpose = new jsld.purposes.AssertionProofPurpose({
        controller: controller
    });

    suite.ensureSuiteContext = ({ document, addSuiteContext }) => {
        return;
        const context = document['@context'];
        if (context === contextUrl ||
            (Array.isArray(context) && context.includes(contextUrl))) {
            // document already includes the required context
            return;
        }

        if (!addSuiteContext) {
            throw new TypeError(
                `The document to be signed must contain this suite's @context, ` +
                `"${contextUrl}".`);
        }

        // enforce the suite's context by adding it to the document
        const existingContext = document['@context'] || [];

        document['@context'] = Array.isArray(existingContext) ?
            [...existingContext, contextUrl] : [existingContext, contextUrl];
    }

    const signedVC = await issue({ credential, suite, purpose, documentLoader: baseDocumentLoader });
    //console.log(JSON.stringify(signedVC, null, 2));
    fs.writeFileSync('./resources/signed-vc.json', JSON.stringify(signedVC, null, 2));
    console.log('Signed VC written to file')
}


run();