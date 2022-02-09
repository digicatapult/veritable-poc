/*
* Title: Consortiq | Connections | Create Invitation
* Usage:
* node 1a-consortiq-create-invitation.js consortiq2alice|jq -c .invitation && \
* echo DONE
* UsageImport:
* import consortiqCreateInvitation from './consortiq-create-invitation.js'
* consortiqCreateInvitation().then(r=>r.json()).then((j)=>console.log(JSON.stringify(j)))
*/
import { /*get,*/ post, log } from './0-util.js' // const {get, post} = require('./0-util.js')

const DOMAIN = 'localhost', PORT = 8021 // TODO: Refactor to dotenv + env valid
const HOST = `http://${DOMAIN}:${PORT}`

const alias = process.argv[2]
const path = '/connections/create-invitation'
const url = HOST + path

const consortiqCreateInvitation = (alias) => {
	alias = alias ? alias : 'consortiq2alice'
	return post( url, {}, { alias: alias } )
}

if (import.meta.url.toString().includes(process.argv[1])) {
	consortiqCreateInvitation(alias).then(r=>r.json()).then((j)=>log(j))
}

export { consortiqCreateInvitation as default }
