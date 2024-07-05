import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.min.css'

const code = new URLSearchParams(window.location.search).get('code')

function App() {

  return (
    <>
      <Login/>
    </>
  )
}

export default App
