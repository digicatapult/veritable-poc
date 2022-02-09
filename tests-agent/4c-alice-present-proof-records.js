/*
* Title: Alice | Present Proof | Records | Get All Records
* Usage:
* node 4c-alice-present-proof-records|jq -c && \
* echo DONE
* UsageImport:
* import alicePresentProofRecord from './4c-alice-present-proof-records.js'
* alicePresentProofRecord().then(r=>r.json()).then(j=>console.log(JSON.stringify(j)))
*/
import { get, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8031
const HOST = `http://${DOMAIN}:${PORT}`

const path = '/present-proof-2.0/records'
const url = HOST + path

const alicePresentProofRecord = () => {
	return get(url)
}

if (import.meta.url.toString().includes(process.argv[1])) {
	alicePresentProofRecord().then(r=>r.json()).then(j=>{log(j)})
}

export { alicePresentProofRecord as default }
