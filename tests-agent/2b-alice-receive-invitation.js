/*
* Title: Alice | Connections | Receive Invitation From Airops
* Usage:
* INVITATION=$(node 2a-airops-create-invitation airops2alice|jq -c .invitation) && \
* node 2b-alice-receive-invitation ${INVITATION} alice2airops|jq -c .connection_id
* UsageImport:
* import airopsCreateInvitation from './2a-airops-create-invitation.js'
* import aliceReceiveInvitationAirops from './2b-alice-receive-invitation.js'
* airopsCreateInvitation().then(r=>r.json()).then(({invitation})=>{
* 	aliceReceiveInvitationAirops(invitation).then(r=>r.json()).then(j=>console.log(j.connection_id))
* })
*/
import { post, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8031 // TODO: Refactor to dotenv + env valid
const HOST = `http://${DOMAIN}:${PORT}`

const invitation = JSON.parse(process.argv[2] ? process.argv[2] : null)
const alias = process.argv[3]
const path = '/connections/receive-invitation'
const url = HOST + path

const aliceReceiveInvitationAirops = (invitation, alias) => {
	if (!invitation) {
		console.log('Invalid invitation. Must have proper invitation obj.')
		process.exit(1)
	}
	alias = alias ? alias : 'alice2airops'
	return post( url, invitation, { alias: alias } )
}

if (import.meta.url.toString().includes(process.argv[1])) {
	aliceReceiveInvitationAirops(invitation, alias).then(r=>r.json()).then((j)=>log(j))
}

export { aliceReceiveInvitationAirops as default }
