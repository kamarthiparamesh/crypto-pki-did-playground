import { readFileSync } from 'fs';
import pkg from 'jsonwebtoken';
const { decode, verify } = pkg;

const publicKey = readFileSync('./keys/public_key.pem', 'utf8');
const signedJWT = readFileSync('./resources/signed-data.jwt', 'utf8');

//JWT Decode
const decoded1 = decode(signedJWT, { algorithms: ['RS256'] });
console.log('Decoded Payload:', decoded1);

//JWT Verify and if success we get decoded JWT
try {
    const decoded = verify(signedJWT, publicKey, { algorithms: ['RS256'] });
    console.log('JWT Verified. Decoded Payload:', decoded);
} catch (err) {
    console.error('JWT Verification Failed:', err.message);
}
