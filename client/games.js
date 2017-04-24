Template.gamesList.onCreated(function() {
  this.games = new ReactiveVar()

  this.autorun(() => {
    const totalPlayers = Session.get('players').players.length
    this.subscribe('games', totalPlayers)
  })
})
