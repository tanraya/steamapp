class PlayerName {
  get(entry) {
    const extracted = this.extract(entry)

    return new Promise((resolve, reject) => {
      switch (extracted.type) {
      case 'id':
      case 'name':
        resolve(extracted.entry)
        break
      case 'profile':
        Meteor.call('getPlayerSummaries', extracted.entry, (error, result) => {
          error ? reject(error) : resolve(result.personaname)
        })
        break
      }
    })
  }

  extract(entry) {
    if (/id\/[^\s]+\/?/.test(entry)) {
      return {
        type: 'id',
        entry: this.getFromUrl(entry)
      }
    } else if (/profiles\/\d+\/?$/.test(entry)) {
      return {
        type: 'profile',
        entry: this.getFromUrl(entry)
      }
    } else if  (/[^\s]+/.test(entry)) {
      return {
        type: 'name',
        entry: entry
      }
    }

    return { type: null }
  }

  getFromUrl(entry) {
    return this.trimSlashes(entry).split('/').pop()
  }

  trimSlashes(entry) {
    return entry.replace(/\/$/, '')
  }
}

Template.newPlayer.events({
  // Add player to list of players
  'submit .js-player_form': function(e, template) {
    e.preventDefault()

    const input = e.target[0]
    const pn = new PlayerName

    pn.get(input.value).then((playerName) => {
      const players = Session.get('players').players.slice()

      if (players.includes(playerName)) { return }

      players.push(playerName)
      Session.setPersistent('players', { players: players })

      NProgress.start()
      Meteor.call('addGames', Session.get('id'), playerName, players, (error, games) => {
        Session.set('games', games)
        NProgress.done()

        // TODO: Make it pretty
        if (error) alert('Cannot load player games')
      })
    })

    input.value = ''
  },

  'click .player_form__hint span': function(e, template) {
    template.find('.player_form__input').value =
      e.currentTarget.getAttribute('data-input')
  }
})
