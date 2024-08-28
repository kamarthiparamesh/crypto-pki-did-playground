import { getResolver } from 'key-did-resolver'
import { Resolver } from 'did-resolver'
import fs from 'fs'

const keyDidResolver = getResolver()
const didResolver = new Resolver(keyDidResolver)
const doc = await didResolver.resolve('did:key:zQ3shofAvrkpoD7W4LM3pzmZ8bNBWR3QGzhfivC4An1UKn6oQ')

//console.log(doc.didDocument)
//console.log(doc.didDocument.verificationMethod)
fs.writeFileSync('./resources/did-document.json', JSON.stringify(doc.didDocument, null, 2));

console.log('did documnent written to file')