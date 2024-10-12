import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  // Conditional return
  // if (!code) {
  //   return <Login />
  // }

  // return <Dashboard code={code} />

  // No need for fragment just return the terinary
  return (
    <>
      {
        code ? ( <Dashboard code ={code}/> ) : ( <Login/> )
      }
    </>
  )
}

export default App
