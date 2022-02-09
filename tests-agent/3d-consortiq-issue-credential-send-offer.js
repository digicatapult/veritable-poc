/*
* Title: Consortiq | Issue Credential 2.0 | Send Offer | Generate Plus Send Credential Offer
*
* Usage:
* CONNECTION_ID=$( \
*  INVITATION_FULL=$(node 1a-consortiq-create-invitation consortiq2alice|jq -c) && \
*  INVITATION=$(echo $INVITATION_FULL|jq -c .invitation) && \
*  CONNECTION_ALICE2CONSORTIQ=$(node 1b-alice-receive-invitation ${INVITATION} alice2consortiq) && \
*  echo $INVITATION_FULL|jq -c .connection_id \
* ) && \
* CREDENTIAL_DEFINITION_ID=$( \
*  SCHEMA="$(node 3a-consortiq-schemas)" && \
*  SCHEMA_ID=$(echo $SCHEMA|jq -c .schema_id) && \
*  SCHEMA_DEF_TAG_NAME=$(echo $SCHEMA|jq -c .schema.name) && \
*  SCHEMA_DEF_TAG_PREFIX="consortiq.agent" && \
*  DID=$(node 3b-consortiq-wallet-did-public|jq .result.did) && \
*  CREDENTIAL_DEFINITION=$( \
*   node 3c-consortiq-credential-definitions "$SCHEMA_ID" "$SCHEMA_DEF_TAG_NAME" $SCHEMA_DEF_TAG_PREFIX $DID \
*  ) && \
*  echo $CREDENTIAL_DEFINITION|jq .credential_definition_id \
*  ) && \
* node 3d-consortiq-issue-credential-send-offer "$CONNECTION_ID" "$CREDENTIAL_DEFINITION_ID"|jq -c .by_format.cred_proposal
*
* UsageImport:
* import consortiqCreateInvitation from './1a-consortiq-create-invitation.js'
* import aliceReceiveInvitationConsortiq from './1b-alice-receive-invitation.js'
* const invitationRaw = await (await consortiqCreateInvitation()).json()
* const invitation = invitationRaw.invitation
* await (await aliceReceiveInvitationConsortiq(invitation)).json()
* const connectionId = invitationRaw.connection_id
*
* import consortiqSchemasCreate from './3a-consortiq-schemas.js'
* import consortiqWalletDidPublicGet from './3b-consortiq-wallet-did-public.js'
* import consortiqCredentialDefinitionsCreate from './3c-consortiq-credential-definitions.js'
* const schemaDefinition = await (await consortiqSchemasCreate()).json()
* const schemaId = schemaDefinition.schema.id
* const schemaDefTagName = schemaDefinition.schema.name.replace(' ', '_')
* const schemaDefTagPrefix = 'consortiq.agent'
* const walletDidPublic = await (await consortiqWalletDidPublicGet()).json()
* const did = walletDidPublic.result.did
* const credDefRaw = await consortiqCredentialDefinitionsCreate(schemaId,schemaDefTagName,schemaDefTagPrefix,did)
* const credDef = await credDefRaw.json()
* const credDefId = credDef.credential_definition_id
*
* import consortiqIssueCredentialSendOffer from './3d-consortiq-issue-credential-send-offer.js'
* const credentialSendOfferResponse = await (await consortiqIssueCredentialSendOffer(connectionId, credDefId)).json()
* console.log(JSON.stringify(credentialSendOfferResponse))
*/
import { post, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8021
const HOST = `http://${DOMAIN}:${PORT}`

const CRED_PREVIEW_TYPE = 'https://didcomm.org/issue-credential/2.0/credential-preview'

const connectionId = process.argv[2]
const credDefId = process.argv[3]

const path = '/issue-credential-2.0/send-offer'
const url = HOST + path

const exchangeTracing = false
const autoRemove = false

/* const namePredefined = 'Alice Smith' */
/* const datePredefined = '2018-05-28' */
/* const degreePredefined = 'Maths' */
/* const agePredefined = 24 */

/* const idPredefined = '1' */
/* const namePredefined = 'Alice' */
/* const surnamePredefined = 'Smith' */
/* const typePredefined = '2' */
/* const titlePredefined = 'UnmannedAircraftSystems' */
/* const subtitlePredefined = 'Remote Pilot Certificate of Competence' */
/* const validityYearDurationPredefined = 10 */

/* getBirthDate = (age)=>{
	const now = new Date()
	const currentYear = now.getFullYear()
	const birthYear = currentYear - age
	const birthMonth = 0
	const birthDay = 1
	const birthDate = new Date(birthYear, birthMonth, birthDay)
	return birthDate.toISOString().replace(new RegExp('-', 'g'), '').slice(0, 8)
} */
const getExpirationDate = (duration) => {
	const now = new Date()
	const currentYear = now.getFullYear()
	const expirationYear = currentYear + duration
	const expirationMonth = 0
	const expirationDay = 10
	const expirationDate = new Date(expirationYear, expirationMonth, expirationDay)
	return expirationDate.toISOString().replace(new RegExp('-', 'g'), '').slice(0, 8)
}
const getTimestamp = ()=>{
	const timestamp = new Date() / 1000
	return timestamp.toFixed()
}
const credAttrsPredefined = {
	'id': '1',
	'name': 'Alice',
	'surname': 'Smith',
	'type': '2',
	'title': 'UnmannedAircraftSystems',
	'subtitle': 'Remote Pilot Certificate of Competence',
	'expiration_dateint': getExpirationDate(10), /*getBirthDate(24),*/ /*'19970928',*/
	'timestamp': getTimestamp()
}
const convertToNameValueArr = (obj)=>{
	var nameValueArr = [];
	for (let [name, value] of Object.entries(obj)) {
		nameValueArr.push({name, value})
	}
	return nameValueArr
}
const sanitizeTitleNoQuotes = (str)=>{
	const quote = new RegExp('"', 'g')
	str = str.replace(quote, '')
	return str
}

const consortiqIssueCredentialSendOffer = (connectionId, credDefId) => {
	if (!connectionId || !credDefId) {
		if (!connectionId) {
			console.log('Error. No Connection ID found. Please provide one!')
			process.exit(1)
		} else if (!credDefId) {
			console.log('Error. No Credential Definition ID found. Please provide one!')
			process.exit(1)
		}
	}
	connectionId = sanitizeTitleNoQuotes(connectionId)
	credDefId = sanitizeTitleNoQuotes(credDefId)
	const credAttrsArr = convertToNameValueArr(credAttrsPredefined)
	const credPreview = {
		'@type': CRED_PREVIEW_TYPE,
		'attributes': credAttrsArr
	}
	const offerRequest = {
		'connection_id': connectionId,
		'comment': `Offer on cred def id ${credDefId}`,
		'auto_remove': autoRemove,
		'credential_preview': credPreview,
		'filter': { 'indy': { 'cred_def_id': credDefId } },
		'trace': exchangeTracing,
	}
	return post(url, offerRequest)
}

if (import.meta.url.toString().includes(process.argv[1])) {
	consortiqIssueCredentialSendOffer(connectionId, credDefId).then(r=>r.json()).then(j=>log(j))
}

export { consortiqIssueCredentialSendOffer as default }
