/*
* Title: Consortiq | Schemas | Create Schema
* Usage:
* node 3a-consortiq-schemas|jq -c .schema_id && \
* echo DONE
* UsageImport:
* import consortiqSchemasCreate from './3a-consortiq-schemas.js'
* consortiqSchemasCreate().then(r=>r.json()).then(j=>console.log(JSON.stringify(j)))
*/
import { post, log } from './0-util.js'

const DOMAIN = 'localhost', PORT = 8021
const HOST = `http://${DOMAIN}:${PORT}`

const path = '/schemas'
const url = HOST + path

const schemaName = [
	'drone', 'schema'
].join(' ')
const version = () => {
	const major = parseInt(Math.random()*1000+1)
	const minor = parseInt(Math.random()*1000+1)
	/* const patch = parseInt(Math.random()*100+1) */
	return `${major}.${minor}`
	/* return `${major}.${minor}.${patch}` */
}
const schemaAttrs = [
	'id', 'name', 'surname',
	'type', 'title', 'subtitle',
	'expiration_dateint', 'timestamp'
]
const schemaBody = {
	'schema_name': schemaName,
	'schema_version': version(),
	'attributes': schemaAttrs
}

const consortiqSchemasCreate = (schemaBody) => {
	const schemaBodyDefault = {
		'schema_name': 'degree schema',
		'schema_version': version(),
		'attributes': [
			'id', 'name', 'surname',
			'type', 'title', 'subtitle',
			'expiration_dateint', 'timestamp'
		]
	}
	schemaBody = schemaBody ? schemaBody : schemaBodyDefault
	return post(url, schemaBody)
}

if (import.meta.url.toString().includes(process.argv[1])) {
	consortiqSchemasCreate(schemaBody).then(r=>r.json()).then(j=>log(j))
}

export { consortiqSchemasCreate as default }
