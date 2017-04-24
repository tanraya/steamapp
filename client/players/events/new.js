Template.newPlayer.events({
  // Add player to list of players
  'submit .player_form': function(e) {
    e.preventDefault()

    const input = e.target[0]
    const playerName = input.value.split('/').pop()
    const players = Session.get('players').players.slice()

    if (!players.includes(playerName)) {
      players.push(playerName)
      Session.setPersistent('players', { players: players })

      Meteor.call('addGames', playerName, (error, result) => {
        // TODO: Make it pretty
        if (error) alert('Cannot load player games')
      })
    }

    input.value = ''
  }
})
