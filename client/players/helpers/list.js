Template.playersList.helpers({
  players: () => {
    return Session.get('players').players
  }
})
