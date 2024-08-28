import { readFileSync, writeFileSync } from 'fs';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const privateKey = readFileSync('./keys/private_key.pem', 'utf8');

const payload = {
    sub: 'ID1234',
    name: 'Paramesh Kamarthi',
    email: "paramesh.k@affinidi.com",
    custom: {
        company: "Affinidi",
        role: "Solution Architech, Lead",
    }
};

const token = sign(payload, privateKey, { algorithm: 'RS256' });
console.log('Signed JWT:', token);

writeFileSync('./resources/signed-data.jwt', token);
