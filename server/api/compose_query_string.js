// Compose query string from object
export default function(params) {
  return Object.keys(params).map((key) => {
    return [ encodeURIComponent(key), "=", encodeURIComponent(params[key]) ].join('')
  }).join('&')
}
