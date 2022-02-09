/*
* Title: Alice | Connections | Receive Invitation From Consortiq
* Usage:
* INVITATION=$(node 1a-consortiq-create-invitation consortiq2alice|jq -c .invitation) && \
* node 1b-alice-receive-invitation ${INVITATION} alice2consortiq|jq -c .connection_id
* UsageImport:
* import consortiqCreateInvitation from './1a-consortiq-create-invitation.js'
* import aliceReceiveInvitationConsortiq from './1b-alice-receive-invitation.js'
* consortiqCreateInvitation().then(r=>r.json()).then(({invitation})=>{
* 	aliceReceiveInvitationConsortiq(invitation).then(r=>r.json()).then(j=>console.log(JSON.stringify(j)))
* })
*/
import { post, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8031 // TODO: Refactor to dotenv + env valid
const HOST = `http://${DOMAIN}:${PORT}`

const invitation = JSON.parse(process.argv[2] ? process.argv[2] : null)
const alias = process.argv[3]
const path = '/connections/receive-invitation'
const url = HOST + path

const aliceReceiveInvitationConsortiq = (invitation, alias) => {
	if (!invitation) { // Instead of this use jsonschema@1.2.11 Validate
		console.log('Invalid invitation. Must have proper invitation obj.')
		process.exit(1)
	}
	alias = alias ? alias : 'alice2consortiq'
	return post( url, invitation, { alias: alias } )
}

if (import.meta.url.toString().includes(process.argv[1])) {
	aliceReceiveInvitationConsortiq(invitation, alias).then(r=>r.json()).then((j)=>log(j))
}

export { aliceReceiveInvitationConsortiq as default }
