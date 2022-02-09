/*
* Title: Alice | Credentials | Get Accepted Credentials From Wallet
* Usage:
* node 3e-alice-credentials|jq -c .results[0] && \
* echo DONE
* UsageImport:
* import aliceCredentialsGet from './3e-alice-credentials.js'
* aliceCredentialsGet().then(r=>r.json()).then(j=>console.log(JSON.stringify(j)))
*/
import { get, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8031
const HOST = `http://${DOMAIN}:${PORT}`

const path = '/credentials'
const url = HOST + path

const aliceCredentialsGet = () => {
	return get(url)
}

if (import.meta.url.toString().includes(process.argv[1])) {
	aliceCredentialsGet().then(r=>r.json()).then(j=>log(j))
}

export { aliceCredentialsGet as default }
