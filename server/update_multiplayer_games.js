import SteamspyApi from './steamspy_api'

const steamspyApi = new SteamspyApi

// Get list of multiplayer games from SteamSpy
export default function() {
  steamspyApi.getMultiplayerGames().then(games => {
    Object.keys(games).forEach((appId) => {
      MultiplayerGames.upsert({ appId: Number(appId) }, { $set: {
        appId: Number(appId)
      }})
    })
  })
  .catch(error => {
    throw new Meteor.Error(error)
  })
}
