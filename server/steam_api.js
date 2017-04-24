import composeUrl from './api/compose_url'

export default class {
  getSteamId(playerName) {
    const url = composeUrl('steamId', { vanityurl: playerName })

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
    const url = composeUrl('userGames', { steamid: steamId, include_appinfo: 1 })

    return new Promise(function(resolve, reject) {
      HTTP.get(url, (error, response) => {
        if (error) {
          reject(error)
        } else {
          resolve(response.data.response.games)
        }
      })
    })
  }

  async getPlayerGames(playerName, cb) {
    const steamId = await this.getSteamId(playerName)
    const games = await this.getGames(steamId)

    return games
  }
}
