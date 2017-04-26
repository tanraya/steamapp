import SteamspyApi from '../api/steamspy'

const steamspyApi = new SteamspyApi

// Cache games from SteamSpy
export default function() {
  steamspyApi.getAllGames().then(appids => {
    appids.forEach(({ appId, isMultiplayer }) => {
      CachedGames.upsert({ appId: Number(appId) }, { $set: {
        appId: Number(appId),
        multiplayer: isMultiplayer ? 1 : 0 
      }})
    })
  })
  .catch(error => {
    throw new Meteor.Error(error)
  })
}
