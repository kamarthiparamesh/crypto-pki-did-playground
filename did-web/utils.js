import { generateKeyPair } from "crypto";
import { Resolver, parse as didWebParser } from "did-resolver";
import { getResolver } from "web-did-resolver";

const webResolver = getResolver()

const didResolver = new Resolver({
    ...webResolver
})

export const utils = {
    generateDidJson: async (data) => {
        const didJsonTemplate = {
            "@context": [
                "https://www.w3.org/ns/did/v1",
                {
                    "RsaSignature2018": "https://w3id.org/security#RsaSignature2018"
                }
            ],
            "id": data.did,
            "publicKey": [
                {
                    "id": data.verificationMethod,
                    "type": "RsaVerificationKey2018",
                    "controller": data.did,
                    "publicKeyPem": data.publicKey
                }
            ],
            "authentication": [
                data.verificationMethod
            ],
            "assertionMethod": [
                data.verificationMethod
            ]
        };

        return didJsonTemplate;
    },
    generateKeys: async () => {
        return new Promise((res, rej) => {
            generateKeyPair(
                "rsa",
                {
                    modulusLength: 2048, // It holds a number. It is the key size in bits and is applicable for RSA, and DSA algorithm only.
                    publicKeyEncoding: {
                        type: "spki", //Note the type is pkcs1 not spki
                        format: "pem",
                    },
                    privateKeyEncoding: {
                        type: "pkcs8", //Note again the type is set to pkcs1
                        format: "pem",
                        //cipher: "aes-256-cbc", //Optional
                        //passphrase: "", //Optional
                    },
                },
                (err, publicKey, privateKey) => {
                    // Handle errors and use the generated key pair.
                    if (err) rej(err);

                    res({
                        publicKey,
                        privateKey,
                    });
                }
            );
        });
    },
    resolveDidweb: async ({ did }) => {
        const doc = await didResolver.resolve(did)
        return doc;
    },

    getDidWebPath: (did) => {
        return didWebParser(did);
    }
}

