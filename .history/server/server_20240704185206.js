require('dotenv').config()
const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  console.log('hi')
  console.log('RT: ', refreshToken)
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken
})

spotifyApi.refreshAccessToken().then(data => {
  accessToken = data.body.access_token
  expiresIn = data.body.expiresIn

}).catch((error) => {
  console.error(error)
  res.sendStatus(400)
  })
})

app.post('/login', (req, res) => {
  const code = req.body.code
  if (!code) {
    return res.status(400).send('Code must be supplied');
  }


  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
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