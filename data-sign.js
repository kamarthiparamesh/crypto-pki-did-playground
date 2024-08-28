import { readFileSync, writeFileSync } from 'fs';
import { createSign } from 'crypto';

const privateKey = readFileSync('./keys/private_key.pem', 'utf8');
const data = readFileSync('./resources/data.txt', 'utf8');

console.log('data:', data);

// Sign the data using the Private Key 
const sign = createSign('SHA256');
sign.update(data);
sign.end();

// Creates a Hash from the data
// Signs the Hash which is the signature  
const signature = sign.sign(privateKey, 'hex');
console.log('Signature is written to file');

writeFileSync('./resources/signature.txt', signature);
