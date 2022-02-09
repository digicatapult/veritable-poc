/*
* Title: Airops | Present Proof | Records | Verify Presentation | Verify The Prev Received Presentation
*
* Usage:
*
CONNECTION_ID=$( \
 INVITATION_FULL=$(node 2a-airops-create-invitation airops2alice|jq -c) && \
 INVITATION=$(echo $INVITATION_FULL|jq -c .invitation) && \
 CONNECTION_ALICE2AIROPS=$(node 2b-alice-receive-invitation ${INVITATION} alice2airops) && \
 echo $INVITATION_FULL|jq -c .connection_id \
) && \
PRES_EX_ID=$(node 4a-present-proof-send-request "$CONNECTION_ID"|jq -c .pres_ex_id) && \
sleep 1 && \
node 4b-present-proof-records-verify-presentation "$PRES_EX_ID"|jq -c .verified
*
* UsageImport:
*
import airopsCreateInvitation from './2a-airops-create-invitation.js'
import aliceReceiveInvitationAirops from './2b-alice-receive-invitation.js'
const invitationRaw = await (await airopsCreateInvitation()).json()
const invitation = invitationRaw.invitation
await (await aliceReceiveInvitationAirops(invitation)).json()
const connectionId = invitationRaw.connection_id

import consortiqSchemasCreate from './3a-consortiq-schemas.js'
await (await consortiqSchemasCreate()).json()

import airopsPresentProofSendRequest from './4a-present-proof-send-request.js'
const proofRaw = await (await airopsPresentProofSendRequest(connectionId)).json()
const presExId = proofRaw.pres_ex_id

import airopsPresentProofRecordsVerifyPresentatio from './4b-present-proof-records-verify-presentation.js'
const verificationRaw = await (await airopsPresentProofRecordsVerifyPresentatio(presExId)).json()
console(JSON.stringify(verificationRaw))

*
*
*/
import { post, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8041
const HOST = `http://${DOMAIN}:${PORT}`

const presentationExchangeId = process.argv[2]

const path = '/present-proof-2.0/records/?/verify-presentation'
const url = HOST + path

const sanitizeTitleNoQuotes = (str)=>{
	const quote = new RegExp('"', 'g')
	str = str.replace(quote, '')
	return str
}

function airopsPresentProofRecordsVerifyPresentatio(presentationExchangeId) {
	if (!presentationExchangeId) {
		console.log('Error. No Presentation Exchange ID found. Please provide one!')
		process.exit(1)
	}
	presentationExchangeId = sanitizeTitleNoQuotes(presentationExchangeId)
	return post( url.replace('?', presentationExchangeId) )
}

if (import.meta.url.toString().includes(process.argv[1])) {
	airopsPresentProofRecordsVerifyPresentatio(presentationExchangeId).then(r=>r.json()).then(j=>{log(j)})
}

export { airopsPresentProofRecordsVerifyPresentatio as default }
