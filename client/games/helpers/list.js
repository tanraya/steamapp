Template.gamesList.helpers({
  games: function() {
    return Session.get('games')
  }
})
