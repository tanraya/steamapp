// Steam Api endpoint URL
const endpoint = 'http://api.steampowered.com'

// Steap API key
const apiKey = process.env.KEY

// Compose query string from object
const composeQueryString = (params) => {
  return Object.keys(params).map((key) => {
    return [ encodeURIComponent(key), "=", encodeURIComponent(params[key]) ].join('')
  }).join('&')
}

// Compose url with params
const composeUrl = (uri, params = {}) => {
  params = Object.assign({ key: apiKey }, params)

  return [
    endpoint, uri, ['?', composeQueryString(params)].join('')
  ].join('/')
}

// Steam API
export default class {
  getPlayerSummaries(steamId) {
    const url = composeUrl('ISteamUser/GetPlayerSummaries/v0002', {
      steamids: steamId
    })

    return new Promise(function(resolve, reject) {
      HTTP.get(url, (error, response) => {
        if (error) {
          reject(error)
        } else {
          resolve(response.data.response.players[0])
        }
      })
    })
  }

  getSteamId(playerName) {
    const url = composeUrl('ISteamUser/ResolveVanityURL/v0001', {
      vanityurl: playerName
    })

    return new Promise(function(resolve, reject) {
      HTTP.get(url, (error, response) => {
        if (error) {
          reject(error)
        } else {
          resolve(response.data.response.steamid)
        }
      })
    })
  }

  getGames(steamId) {
    const url = composeUrl('IPlayerService/GetOwnedGames/v0001', {
      steamid: steamId, include_appinfo: 1
    })

    return new Promise(function(resolve, reject) {
      HTTP.get(url, (error, response) => {
        if (error) {
          reject(error)
        } else {
          const games = response.data.response.game_count == 0 ? [] : response.data.response.games
          resolve(games)
        }
      })
    })
  }

  async getPlayerGames(playerName) {
    const steamId = await this.getSteamId(playerName)
    const games = await this.getGames(steamId)

    return games
  }
}
