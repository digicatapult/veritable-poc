/*
* Title: Airops | Present Proof | Records | Fetch all preset proof exchange records
*
* Usage: node 4d-airops-present-proof-records|jq .results[0].state
* echo DONE
* UsageImport:
* import airopsPresentProofRecords from './4d-airops-present-proof-records.js'
* airopsPresentProofRecords().then(r=>r.json()).then((j)=>console.log(JSON.stringify(j)))
*/
import { get, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8041
const HOST = `http://${DOMAIN}:${PORT}`

const path = '/present-proof-2.0/records'
const url = HOST + path

const airopsPresentProofRecords = () => {
	return get(url)
}

if (import.meta.url.toString().includes(process.argv[1])) {
	airopsPresentProofRecords().then(r=>r.json()).then(j=>{log(j)})
}

export { airopsPresentProofRecords as default }
