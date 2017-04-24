import { Meteor } from 'meteor/meteor'
import SteamApi from './steam_api'
import updateMultiplayerGames from './update_multiplayer_games'

Meteor.startup(() => {
  // Load multiplayer games app ids on server start
  updateMultiplayerGames()
})

// Update multiplayer games list every 5 minutes
Meteor.setInterval(updateMultiplayerGames, 60000 * 5)

Meteor.publish('games', function(totalPlayers) {
  // Use MongoDB aggregation framework to filter games list
  ReactiveAggregate(this, Games, [
    {
      $group: {
        _id: { name: "$name" },
        logo: { $first: "$logo" },
        name: { $first: "$name" },
        appId: { $first: "$appId" },
        count: { $sum: 1 }
      }
    },

    {
      $match: { count: { $gte: totalPlayers } }
    },

    {
      $sort : { name: 1 }
    },

    {
      $project: {
        _id: "$name",
        name: "$name",
        logo: "$logo",
        appId: "$appId"
      }
    }
  ])
})

Meteor.methods({
  // Add games list with `playerName` games
  addGames: function(playerName) {
    const multiplayerGames = MultiplayerGames.find().map(x => x.appId)
    const steamApi = new SteamApi

    steamApi.getPlayerGames(playerName)
      .then(games => {
        games.forEach(({ appid, name, img_logo_url }) => {
          // Do not insert non-multiplayer games
          if (!multiplayerGames.includes(appid)) { return }

          Games.upsert({ appId: appid, playerName: playerName }, { $set: {
            appId: Number(appid),
            playerName: playerName,
            name: name,
            logo: img_logo_url
          }})
        })
      })
      .catch(error => {
        throw new Meteor.Error(error)
      })
  },

  // Remove player games
  removePlayerGames: function(playerName) {
    Games.remove({ playerName: playerName })
  }
})
