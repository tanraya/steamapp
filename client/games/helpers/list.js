Template.gamesList.helpers({
  games: function() {
    return Games.find({}, {
      sort: { name: 1 }
    })
  }
})
