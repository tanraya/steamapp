Template.playersList.events({
  // Remove player from list
  'click .js-players__remove_btn': function(e) {
    const playerName = this.toString()

    Session.setPersistent('players', {
      players: Session.get('players').players.filter(name => name !== playerName)
    })

    NProgress.start()
    Meteor.call('reloadGames', Session.get('id'), playerName, Session.get('players').players, (error, games) => {
      Session.set('games', games)
      NProgress.done()
    })
  }
});
