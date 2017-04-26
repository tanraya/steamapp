Template.gamesList.onCreated(function() {
  const sessionId = Session.get('id')

  // Generate session id if not exists
  if (!sessionId) {
    Session.setPersistent('id', Random.id())
  }

  // Load games on app load
  const players = Session.get('players').players

  NProgress.start()
  Meteor.call('getGames', Session.get('id'), players, (error, games) => {
    if (!error) {
      Session.set('games', games)
    }

    NProgress.done()
  })
})
