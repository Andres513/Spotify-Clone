import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

const code = new URLSearchParams(window.location.search).get('code')

function App() {

  return (
    <>
      {
        code ? ( <Dashboard code ={code}/> ) : ( <Login/> )
      }
    </>
  )
}

export default App
