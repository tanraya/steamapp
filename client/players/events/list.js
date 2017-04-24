Template.playersList.events({
  // Remove player from list
  'click .players__remove_btn': function(e) {
    const playerName = this.toString()

    Session.setPersistent('players', {
      players: Session.get('players').players.filter(name => name !== playerName)
    })

    Meteor.call('removePlayerGames', playerName, (error, result) => {
      // TODO: Make it pretty
      if (error) alert('Cannot remove player games')
    })
  }
});
