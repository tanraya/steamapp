const config = require('../config/config.json')

export default class {
  // Load multiplayer games from SteamSpy
  getMultiplayerGames() {
    return new Promise(function(resolve, reject) {
      HTTP.get(config.steamspyApi.url, (error, response) => {
        if (error) {
          reject(error)
        } else {
          resolve(response.data)
        }
      })
    })
  }
}
