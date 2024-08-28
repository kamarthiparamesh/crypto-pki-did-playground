import { getResolver } from 'key-did-resolver'
import { Resolver } from 'did-resolver'
import fs from 'fs'

const keyDidResolver = getResolver()
const didResolver = new Resolver(keyDidResolver)
const doc = await didResolver.resolve('did:key:z6Mko2cmLuzLPboieZh4tiemp6B3CSi32p3KFhCViQTWmMsi')

//console.log(doc.didDocument)
//console.log(doc.didDocument.verificationMethod)
fs.writeFileSync('./resources/did-document.json', JSON.stringify(doc.didDocument, null, 2));

console.log('did documnent written to file')