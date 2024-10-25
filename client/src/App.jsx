// You must create an app from developer.spotify.com and set the redirect URI to http://localhost:3000

// 1. Go into client >> .env >> enter you client ID from your spotify app basic information settings

// 2. Go into server >> .env >> enter your CLIENT_ID and CLIENT_SECRET values from your spotify app basic information settings

// 3. In terminal, cd into client folder and type the following command
//     npm i

// 4. Then cd into server folder and run the following:
//     npm i

// 5. To run app, open terminal and cd into client folder and run the following:
//     npm run dev

// 6. Then open up another terminal window and cd into server folder and run the following:
//     npm run devStart

import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

function App() {

  if (!code) {
    return <Login />
  }
  return <Dashboard code={code} />
}

export default App
