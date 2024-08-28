# Encryption types

1. Symmetric encryption
   Uses one key to encrypt and decrypt, Symmetric encryption is also called “secret key” encryption: the key must be kept secret from third parties

2. Asymmetric encryption

The sender and the recipient use two different keys.
Asymmetric encryption, also known as public key encryption, uses a public key-private key pairing:
data encrypted with the public key can only be decrypted with the private key

# Generate a 2048-bit RSA private key

```
openssl genpkey -algorithm RSA -out ./keys/private_key.pem -pkeyopt rsa_keygen_bits:2048
```

# Extract the public key from the private key

```
openssl rsa -pubout -in ./keys/private_key.pem -out ./keys/public_key.pem
```

# Generate a Digital Certificate

this generates x509 digital certificate with private key and certificate, enter the details when prompted like name,country, company etc..

```
openssl req -x509 -newkey rsa:4096 -keyout pk_key.pem -out cert.crt -sha256 -days 365
```

# Setup

Do install the dependencies

```
npm install
```

# Sign & Verify the data using RSA keypair

1. Run the below command to generate digital signature(`signature.txt`) for the data(`data.txt`)

```
node data-sign.js
```

2. Verify the data

```
node data-verify.js
```

3. Verify when data/signature is tampered
   Modify the data in the file `data.txt` or its signature in `signature.txt`
   and try to verify it using below command

```
node data-verify.js
```

# Sign & Verify a JWT using RSA keypair

1. Run the below command to generate JWT (`signed-data.jwt`) contains algorithm.payload.signature

```
node jwt-sign.js
```

2. Verify the data

```
node jwt-verify.js
```

3. Verify when data/signature is tampered
   Modify the JWT last part i.e. its signature in `signed-data.jwt`
   and try to verify it using below command

```
node jwt-verify.js
```

# Generate Edwards-curve/Secp256k1 and then Sign & Verify the data

There are many signature suites (https://w3c-ccg.github.io/ld-cryptosuite-registry/#signature-suites)[https://w3c-ccg.github.io/ld-cryptosuite-registry/#signature-suites]

Few are Ed25519, RSA, Secp256k1, JWS, GPG, JCS Ed25519, BBS+ Signature 

1. Run the below command to generate keypair (`key-pair-private.json` & `key-pair.json`)

Note: Open the terminal to directory `Ed25519` or `Secp256k1`
```
node generator.js
```

2. Sign the data using the above keypair

```
node signer.js
```

3. Verify the data

```
node verifier.js
```

4. Verify when data/signature is tampered
   Modify the data in the file `data.txt` or its signature in `signature.txt`
   and try to verify it using below command

```
node verifier.js
```

# Generate did:key from the above keypair

1. Run the below command to generate DID

```
node did-key-generator.js
```

2. You can resolve the DID to its DID document (`did-document.json`)

you can resolve online too : (https://dev.uniresolver.io/)[https://dev.uniresolver.io/]

Note: Change the hardcoded DID in the file with DID got from previous step before executing
```
node did-key-resolver.js
```

3. Sign a VC using above DID with private key of the keypair, You can see the signed VC `signed-vc.json`

```
node did-issue-sign-vc.js
```

3. Verify the signed VC by resolving the DID

```
node did-issue-verify-vc.js
```

4. Verify when Signed VC is tampered by `signed-vc.json` and try to verify it using below command

```
node did-issue-verify-vc.js
```


# Test PEX

1. Run the below command to run queries on the list of VCs

```
node pex-test.js
```

