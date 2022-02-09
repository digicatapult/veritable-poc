import fetch from 'node-fetch' // const fetch = require('node-fetch')

// function get(url, params) { return fetch(url + '?' + new URLSearchParams(params).toString(), { method: 'GET' }) }
const get = (url, params, headers  ) => {
	params = new URLSearchParams(params).toString()
	url = url + '?' + params
	const headerJSON = { 'Content-Type': 'application/json' }
	headers = headers ? headers : headerJSON
	return fetch(url , { method: 'GET', headers: headers }) // encodeURIComponent ?
}

// function post ( url , body , headers ) { return fetch( url , { method : 'POST', body: JSON.stringify(body), headers: headers } ) }
const post = (url, body, params, headers ) => {
	params = new URLSearchParams(params).toString()
	url = url + '?' + params
	const headerJSON = { 'Content-Type': 'application/json' }
	headers = headers ? headers : headerJSON
	return fetch(url , { method : 'POST', body: JSON.stringify(body), headers: headers })
}

// function log (json) { return console.log( JSON.stringify(json).replace( new RegExp(',', 'g'), ',' ) ) }
const log = (json) => {
	return console.log( JSON.stringify(json).replace( new RegExp(',', 'g'), ',' ) )
}

export { get, post, log }
