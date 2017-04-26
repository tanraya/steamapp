import { Meteor } from 'meteor/meteor'
import SteamApi from './api/steam'
import updateCachedGames from './lib/update_cached_games'
import findMutualGames from './lib/find_mutual_games'

Meteor.startup(() => {
  updateCachedGames()
})

// Update cached games every day
Meteor.setInterval(updateCachedGames, 60000 * 60 * 24)

import SteamSpyApi from './api/steamspy'

const steamApi = new SteamApi
const steamSpyApi = new SteamSpyApi

Meteor.methods({
  // Add games list with `playerName` games
  addGames: function(sessionId, playerName, players) {
    const upsertGame = ({ appid, name, img_logo_url }) => {
      Games.upsert({ appId: appid, playerName: playerName, sessionId: sessionId }, { $set: {
        sessionId: sessionId,
        appId: Number(appid),
        playerName: playerName,
        name: name,
        logo: img_logo_url
      }})
    }

    const lookupSteamspy = (appid, timeout = 250) => {
      steamSpyApi.checkGameIsMultiplayer(appid)
        .then((isMultiplayer) => {
          if (isMultiplayer) {
            upsertGame(game)
          }

          CachedGames.insert({ appId: Number(appid), multiplayer: isMultiplayer ? 1 : 0 })
        })
        .catch(error => lookupSteamspy(appid))

      Meteor._sleepForMs(timeout)
    }

    const upsertGames = (games) => {
      games.forEach((game) => {
        const cachedGame = CachedGames.findOne({ appId: Number(game.appid) })

        if (cachedGame) {
          if (cachedGame.multiplayer == 1) {
            upsertGame(game)
          }
        } else {
          lookupSteamspy()
        }
      })
    }

    return new Promise((resolve, reject) => {
      steamApi.getPlayerGames(playerName)
        .then(games => {
          upsertGames(games)
          resolve(findMutualGames(sessionId, players))
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // Reload games
  reloadGames: function(sessionId, playerName, players) {
    Games.remove({ sessionId: sessionId, playerName: playerName })

    return new Promise((resolve, reject) => {
      resolve(findMutualGames(sessionId, players))
    })
  },

  getPlayerSummaries: function(steamId) {
    return steamApi.getPlayerSummaries(steamId)
  },

  getGames: function(sessionId, players) {
    return new Promise((resolve, reject) => {
      resolve(findMutualGames(sessionId, players))
    })
  }
})
