const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '41d057fa0a1841388bf0cafb1110a811',
    clientSecret: 'fc29d4ca60d949e3b20cb4cd103a867a',
  })
  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    })
  }).catch((error)=> {
    console.error(error)
    res.sendStatus(400)
  })
})
app.listen(3001)