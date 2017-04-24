import composeQueryString from './compose_query_string'
const config = require('../../config/config.json')

// Compose url with params
export default function(urlFor, params = {}) {
  params = Object.assign({ key: config.key }, params)

  return [
    config.endpoint,
    config.steamApi.urls[urlFor],
    ['?', composeQueryString(params)].join('')
  ].join('/')
}
