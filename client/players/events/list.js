Template.playersList.events({
  // Remove player from list
  'click .js-players__remove_btn': function(e) {
    const playerName = this.toString()

    Session.setPersistent('players', {
      players: Session.get('players').players.filter(name => name !== playerName)
    })

    NProgress.start()
    Meteor.call('removePlayerGames', Session.get('id'), playerName, (error, result) => {
      // TODO: Make it pretty
      if (error) {
        alert('Cannot remove player games')
      } else {
        Session.setPersistent('games', [])
        NProgress.done()
      }
    })
  }
});
