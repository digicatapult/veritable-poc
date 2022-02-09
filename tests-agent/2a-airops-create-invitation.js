/*
* Title: Airops | Connections | Create Invitation
* Usage:
* node 2a-airops-create-invitation airops2alice|jq -c .invitation && \
* echo DONE
* UsageImport:
* import airopsCreateInvitation from './2a-airops-create-invitation.js'
* airopsCreateInvitation(alias).then(r=>r.json()).then(console.log)
*/
import { post, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8041 // TODO: Refactor to dotenv + env valid
const HOST = `http://${DOMAIN}:${PORT}`

const alias = process.argv[2]
const path = '/connections/create-invitation'
const url = HOST + path

const airopsCreateInvitation = (alias) => {
	alias = alias ? alias : 'airops2alice'
	return post( url, {}, { alias: alias } )
}

if (import.meta.url.toString().includes(process.argv[1])) {
	airopsCreateInvitation(alias).then(r=>r.json()).then((j)=>log(j))
}

export { airopsCreateInvitation as default }
