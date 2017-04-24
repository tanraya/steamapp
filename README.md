# Steamapp

Поиск совместных мультиплеерных игр для нескольких аккаунтов.
Приложение написано на Meteor.

### Демо

Демо-версию этого приложения [можно посмотреть здесь](http://steamapp.eu.meteorapp.com/)

### Установка

```bash
$ git clone https://github.com/tanraya/steamapp.git
$ cd steamapp/
```

Создайте файл `config/settings.json` и положите туда это:

```json
{
  "key": "<STEAM_API_KEY>",
  "endpoint": "http://api.steampowered.com",
  "steamApi": {
    "urls": {
      "steamId": "ISteamUser/ResolveVanityURL/v0001",
      "userGames": "IPlayerService/GetOwnedGames/v0001"
    }
  },
  "steamspyApi": {
    "url": "http://steamspy.com/api.php?request=genre&genre=Multiplayer"
  }
}

```

```bash
$ yarn install
$ meteor # open http://localhost:3000
```

