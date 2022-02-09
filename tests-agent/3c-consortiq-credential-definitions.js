/*
* Title: Consortiq | Credential Definitions | Create Credential Definition
* Usage:
* SCHEMA="$(node 3a-consortiq-schemas)" && \
* SCHEMA_ID=$(echo $SCHEMA|jq -c .schema_id) && \
* SCHEMA_DEF_TAG_NAME=$(echo $SCHEMA|jq -c .schema.name) && \
* SCHEMA_DEF_TAG_PREFIX="consortiq.agent" && \
* DID=$(node 3b-consortiq-wallet-did-public|jq .result.did) && \
* node 3c-consortiq-credential-definitions "$SCHEMA_ID" "$SCHEMA_DEF_TAG_NAME" $SCHEMA_DEF_TAG_PREFIX $DID \
* |jq .credential_definition_id
* UsageImport:
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
* console.log(JSON.stringify(credDef))
*/
import { post, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8021
const HOST = `http://${DOMAIN}:${PORT}`

const schemaId = process.argv[2]
const schemaDefTagName = process.argv[3]
const schemaDefTagPrefix = process.argv[4]
const did = process.argv[5]
const path = '/credential-definitions'
const url = HOST + path

const supportRevocation = false

const sanitizeTitleNoQuotes = (str)=>{
	const quote = new RegExp('"', 'g')
	str = str.replace(quote, '')
	return str
}
const sanitizeTitleWUnderscore = (str)=>{
	const space = new RegExp(' ', 'g')
	str = str.replace(space, '_')
	return str
}
const consortiqCredentialDefinitionsCreate = (schemaId,schemaDefTagName,schemaDefTagPrefix,did)=>{
	if (!schemaId || !schemaDefTagName || !schemaDefTagPrefix || !did) {
		console.log('Missing arg error:')
		console.log('Missing arg error: Please provide all four arguments.')
		console.log('Please provide: schemaId,schemaDefTagName,schemaDefTagPrefix,did')
		process.exit(1)
	}
	schemaId = sanitizeTitleNoQuotes(schemaId)
	schemaDefTagName = sanitizeTitleWUnderscore(schemaDefTagName)
	schemaDefTagName = sanitizeTitleNoQuotes(schemaDefTagName)
	const credDefTag = `${schemaDefTagPrefix}.${schemaDefTagName}`
	const credentialDefinitionBody = {
		'schema_id': schemaId,
		'support_revocation': supportRevocation,
		'tag': credDefTag,
		'did': did
	}
	return post(url, credentialDefinitionBody)
}

if (import.meta.url.toString().includes(process.argv[1])) {
	consortiqCredentialDefinitionsCreate(schemaId,schemaDefTagName,schemaDefTagPrefix,did)
		.then(r=>r.json())
		.then(j=>log(j))
}

export { consortiqCredentialDefinitionsCreate as default }
