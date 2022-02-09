/*
* Title: Airops | Present Proof | Send Request | Create Plus Sent Proof Request To Prove Predicaments
*
* Usage:
*
* CONNECTION_ID=$( \
*  INVITATION_FULL=$(node 2a-airops-create-invitation airops2alice|jq -c) && \
*  INVITATION=$(echo $INVITATION_FULL|jq -c .invitation) && \
*  CONNECTION_ALICE2AIROPS=$(node 2b-alice-receive-invitation ${INVITATION} alice2airops) && \
*  echo $INVITATION_FULL|jq -c .connection_id \
* ) && \
* node 4a-present-proof-send-request "$CONNECTION_ID"|jq -c .pres_ex_id
*
* UsageImport:
*
* import airopsCreateInvitation from './2a-airops-create-invitation.js'
* import aliceReceiveInvitationAirops from './2b-alice-receive-invitation.js'
* const invitationRaw = await (await airopsCreateInvitation()).json()
* const invitation = invitationRaw.invitation
* await (await aliceReceiveInvitationAirops(invitation)).json()
* const connectionId = invitationRaw.connection_id
*
* import consortiqSchemasCreate from './3a-consortiq-schemas.js'
* await (await consortiqSchemasCreate()).json()
*
* // import {get} from './0-util.js'
* // const connections = await (await get('http://localhost:8041/connections')).json()
* // connections.results.forEach((e,i) => { if (e.connection_id == connectionId) { console.log(e.state) } })
* import airopsPresentProofSendRequest from './4a-present-proof-send-request.js'
* const proofRaw = await (await airopsPresentProofSendRequest(connectionId)).json()
* const presExId = proofRaw.pres_ex_id
* console.log({presExId})
*
*/
import { post, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8041
const HOST = `http://${DOMAIN}:${PORT}`

const connectionId = process.argv[2]

const path = '/present-proof-2.0/send-request'
const url = HOST + path

const exchangeTracing = false

/*
const eighteenYearsAgo = () => {
	var today = new Date()
	var y = today.getFullYear() - 18
	var m = today.getMonth()+1
	var d = today.getDate()
	return y*10000 + m*100 + d
}
*/
const oneYearsAhead = () => {
	var today = new Date()
	var y = today.getFullYear() + 1
	var m = today.getMonth()+1
	var d = today.getDate()
	return y*10000 + m*100 + d
}
const sanitizeTitleNoQuotes = (str)=>{
	const quote = new RegExp('"', 'g')
	str = str.replace(quote, '')
	return str
}
const reqAttrsPredefined = [
	{	'name':'id','restrictions':[ { 'schema_name':'drone schema', 'attr::id::value': '1' } ] },
	{	'name':'name','restrictions':[ {'schema_name':'drone schema', 'attr::name::value': 'Alice' } ] },
	{	'name':'surname','restrictions':[ {'schema_name':'drone schema', 'attr::surname::value': 'Smith' } ] },
	{	'name':'type','restrictions':[ {'schema_name':'drone schema', 'attr::type::value': '2' } ] }
]
const reqPrs4zkProofsPredefined = [
	{	'name': 'expiration_dateint',
		'p_type': '>=',
		'p_value': oneYearsAhead(), /* 20220101 */
		'restrictions': [{'schema_name':'drone schema'}] },
]
const indyProofRequestPredefined = {
	'name': 'Proof of Expiration',
	'version': '1.0',
	'requested_attributes': Object.fromEntries(reqAttrsPredefined.map(e => [`0_${e.name}_uuid`, e])),
	'requested_predicates': Object.fromEntries(reqPrs4zkProofsPredefined.map(e => [`0_${e.name}_GE_uuid`, e]))
}

const airopsPresentProofSendRequest = (connectionId) => {
	if (!connectionId) {
		console.log('Error. No Connection ID found. Please provide one!')
		process.exit(1)
	}
	connectionId = sanitizeTitleNoQuotes(connectionId)
	const proofRequestWebRequest = {
		'connection_id': connectionId,
		'presentation_request': { 'indy': indyProofRequestPredefined },
		'trace': exchangeTracing
	}
	return post(url, proofRequestWebRequest)
}

if (import.meta.url.toString().includes(process.argv[1])) {
	airopsPresentProofSendRequest(connectionId).then(r=>r.json()).then(j=>{log(j)})
}

export { airopsPresentProofSendRequest as default }
