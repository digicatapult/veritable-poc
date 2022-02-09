/*
* Title: Consortiq | Walled | DID | Public | Get Public DID
* Usage:
* node 3b-consortiq-wallet-did-public|jq .result.did && \
* echo DONE
* UsageImport:
* import consortiqWalletDidPublicGet from './3b-consortiq-wallet-did-public.js'
* consortiqWalletDidPublicGet().then(r=>r.json()).then(j=>console.log(JSON.stringify(j)))
*/
import { get, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8021
const HOST = `http://${DOMAIN}:${PORT}`

const path = '/wallet/did/public'
const url = HOST + path

const consortiqWalletDidPublicGet = () => {
	return get(url)
}

if (import.meta.url.toString().includes(process.argv[1])) {
	consortiqWalletDidPublicGet().then(r=>r.json()).then(j=>log(j))
}

export { consortiqWalletDidPublicGet as default }
