
import { PEX } from '@sphereon/pex'

const input = {
    simplePEX: {
        "id": "vp_token_with_email_vc",
        "input_descriptors": [
            {
                "id": "email_vc",
                "name": "Email VC",
                "purpose": "Check if VC data contains necessary fields",
                "constraints": {
                    "fields": [
                        {
                            "path": [
                                "$.type"
                            ],
                            "purpose": "Check if VC type is correct",
                            "filter": {
                                "type": "array",
                                "pattern": "Email"
                            }
                        },
                        {
                            "path": [
                                "$.credentialSubject.email"
                            ],
                            "purpose": "Check if VC contains email field",
                            "filter": {
                                "type": "string"
                            }
                        },
                        {
                            "path": [
                                "$.issuer"
                            ],
                            "purpose": "Check if VC Issuer is Trusted",
                            "filter": {
                                "type": "string",
                                "pattern": "^did:key:zQ3shtMGCU89kb2RMknNZcYGUcHW8P6Cq3CoQyvoDs7Qqh33N"
                            }
                        }
                    ]
                }
            }
        ]
    },
    combinedPEX: {
        "id": "vp_combined_email_user_profile_combined",
        "submission_requirements": [{ "rule": "pick", "min": 1, "from": "A" }],
        "input_descriptors": [
            {
                "id": "email_vc",
                "name": "Email VC",
                "purpose": "Check if VC data contains necessary fields",
                "group": ["A"],
                "constraints": {
                    "fields": [
                        {
                            "path": [
                                "$.credentialSubject.email"
                            ],
                            "purpose": "Check if VC contains email field",
                            "filter": {
                                "type": "string"
                            }
                        }
                    ]
                }
            },
            {
                "id": "profile_vc",
                "name": "profile VC type",
                "purpose": "Profile VC TEXXDD",
                "group": ["A"],
                "constraints": {
                    "fields": [
                        {
                            "path": [
                                "$.type"
                            ],
                            "purpose": "Check if VC type is correct",
                            "filter": {
                                "type": "array",
                                "pattern": "^Document$"
                            }
                        },
                        {
                            "path": [
                                "$.credentialSubject.documentType"
                            ],
                            "purpose": "Check if VC contains type field and it should be PAN",
                            "filter": {
                                "type": "string",
                                "pattern": "PAN"
                            }
                        },
                    ]
                }
            },
        ]
    },
}

const VCs = [
    {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://schema.affinidi.com/EmailV1-0.jsonld"
        ],
        "id": "claimId:f8a35252a2bcc9b5",
        "type": [
            "VerifiableCredential",
            "Email"
        ],
        "holder": {
            "id": "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i"
        },
        "issuanceDate": "2023-11-23T04:59:31.058Z",
        "issuer": "did:key:zQ3shtMGCU89kb2RMknNZcYGUcHW8P6Cq3CoQyvoDs7Qqh33N",
        "credentialSubject": {
            "email": "paramesh.k@affinidi.com"
        },
        "credentialSchema": {
            "type": "JsonSchemaValidator2018",
            "id": "https://schema.affinidi.com/EmailV1-0.json"
        },
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "created": "2023-11-23T04:59:34Z",
            "verificationMethod": "did:key:zQ3shtMGCU89kb2RMknNZcYGUcHW8P6Cq3CoQyvoDs7Qqh33N#zQ3shtMGCU89kb2RMknNZcYGUcHW8P6Cq3CoQyvoDs7Qqh33N",
            "proofPurpose": "assertionMethod",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..XO9KiaSiiXeNBkkPspbfQjdwG-k2J0AufjshvA2U3XdD6UZiwAwgRQ8tFbG7LbTjjXpHNmkM1Y-bSUQ11NGghQ"
        }
    },
    {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://schema.affinidi.com/DocumentV1-3.jsonld",
            "https://w3id.org/security/suites/ed25519-2020/v1"
        ],
        "id": "claimId:jHyLauwDtGeOYRTXNhx8X",
        "type": [
            "VerifiableCredential",
            "Document"
        ],
        "holder": {
            "id": "did:key:zQ3shqeuTqstXCVKL4peLhxmmLTjYSyoeCoPasx3vK3PQPf6i"
        },
        "issuanceDate": "2024-08-27T09:18:48.966Z",
        "issuer": "did:key:z6MksRs1vKwdhUeCZJ9TQs1EDW8e6UBpzAsdnzmyteHaSwNu",
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
        },
        "proof": {
            "type": "Ed25519Signature2020",
            "created": "2024-08-27T09:18:48Z",
            "verificationMethod": "did:key:z6MksRs1vKwdhUeCZJ9TQs1EDW8e6UBpzAsdnzmyteHaSwNu",
            "proofPurpose": "assertionMethod",
            "proofValue": "z5up8ukxr4fvYiLFgH1f45UDfUyG1BHUbvV3zLkzZkMqHuNpgPQFRftyNFWVYWXCTggNAff8QtbWUyZzbHmuCwumf"
        }
    },
    {
        "@context": ["https://www.w3.org/2018/credentials/v1", "https://schema.affinidi.com/UserProfileV2-0.jsonld"],
        "id": "claimId:wxEcXKWfmAL2ha1PVJCpe",
        "type": ["VerifiableCredential", "UserProfile"],
        "holder": {
            "id": "did:key:z6MksRs1vKwdhUeCZJ9TQs1EDW8e6UBpzAsdnzmyteHaSwNu"
        },
        "credentialSubject": {
            "givenName": "Paramesh",
            "updatedAt": 1691123937632,
            "address": {}
        },
        "credentialSchema": {
            "id": "https://schema.affinidi.com/UserProfileV2-0.json",
            "type": "JsonSchemaValidator2018"
        },
        "issuanceDate": "2023-08-04T04:38:57.658Z",
        "issuer": "did:key:z6MksRs1vKwdhUeCZJ9TQs1EDW8e6UBpzAsdnzmyteHaSwNu",
        "proof": {
            "type": "EcdsaSecp256k1Signature2019",
            "created": "2023-08-04T04:38:57Z",
            "verificationMethod": "did:key:z6MksRs1vKwdhUeCZJ9TQs1EDW8e6UBpzAsdnzmyteHaSwNu",
            "proofPurpose": "assertionMethod",
            "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..J6mgQOb8l8zzIRKpWuQgso0Uo2pwjrWBv14KrSX4cpBvnDl9mF5omibM153qUVJ1zoO3kunoCCtN7mqstSEEUA"
        }
    }
]

const pex = new PEX()
const match = pex.selectFrom(
    input.combinedPEX,
    VCs,
)

//console.log('errors', JSON.stringify(match))
console.log('matches', match.matches)

if (match.matches.length > 0) {
    match.verifiableCredential.forEach(vc => console.log(vc.type[1], vc.credentialSubject));
} 