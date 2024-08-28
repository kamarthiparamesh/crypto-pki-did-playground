import { readFileSync } from 'fs';
import { createVerify } from 'crypto';

const publicKey = readFileSync('./keys/public_key.pem', 'utf8');
const data = readFileSync('./resources/data.txt', 'utf8');
const signature = readFileSync('./resources/signature.txt', 'utf8');

console.log('data:', data);
console.log('Signature:', signature);

// Verify the signature
const verify = createVerify('SHA256');
verify.update(data);
verify.end();

const isVerified = verify.verify(publicKey, signature, 'hex');
console.log('Signature Verified:', isVerified);