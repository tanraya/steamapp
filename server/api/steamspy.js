// SteamSpy API
export default class {
  getAllGames() {
    const url = 'http://steamspy.com/api.php?request=all'

    return new Promise(function(resolve, reject) {
      HTTP.get(url, (error, response) => {
        if (error) {
          reject(error)
        } else {
          const games = Object.keys(response.data).map((k) => {
            return {
              appId: response.data[k].appid,
              isMultiplayer: !!response.data[k].tags['Multiplayer']
            }
          })

          resolve(games)
        }
      })
    })
  }

  checkGameIsMultiplayer(appId) {
    const url = 'http://steamspy.com/api.php?request=appdetails&appid=' + appId

    return new Promise(function(resolve, reject) {
      HTTP.get(url, (error, response) => {
        if (error) {
          reject(error)
        } else {
          const isMultiplayer = !!response.data.tags['Multiplayer']
          resolve(isMultiplayer)
        }
      })
    })
  }
}
