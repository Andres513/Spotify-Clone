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
