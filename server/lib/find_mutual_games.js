export default function(sessionId, players) {
  return Games.aggregate([
    {
      $match: { sessionId: sessionId }
    },

    {
      $match: { playerName: { $in: players } }
    },

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
      $match: { count: { $gte: players.length } }
    },

    {
      $sort : { name: 1 }
    },

    {
      $project: {
        _id: "$name",
        name: "$name",
        logo: "$logo",
        appId: "$appId",
        sessionId: "$sessionId",
      }
    }
  ])
}
