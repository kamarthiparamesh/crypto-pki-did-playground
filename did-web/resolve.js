
import { utils } from './utils.js'

async function run() {

    //const did = `did:web:localhost`;  // https://localhost/.well-known/did.json
    //const did = `did:web:localhost:path1:path2`;  // https://localhost/path1/path2/did.json
    const did = `did:web:example-domain.com:user:paramesh` // https://example-domain.com/user/paramesh/did.json

    const didDocument = await utils.resolveDidweb({ did });
    console.log('didDocument', didDocument);

}

run();