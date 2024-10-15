import React from 'react'
import { useState, useEffect } from 'react'

export default function Profile({ accessToken }) {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getProfile = async () => {
      if (!accessToken) return
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        const req = await response.json()
        setDisplayName(req.display_name)
        setEmail(req.email)
      } catch (err) {
        console.error('Error getting user profile: ', err)
        setErrorMessage('Failed to fetch user profile')
      }
    }
    getProfile()
  }, [accessToken])

  const handleLogOut = (event) => {
    event.preventDefault()
    window.location = '/'
  }

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>
  }
  return (
    <div className='profile-container'>
      <div className="p-item">Welcome, {displayName}!</div>
      <div className="p-item">{email}</div>
      <div className="p-item">Search for a song!</div>
      <button onClick={handleLogOut} className="logout-button">Log Out</button>
    </div>


  )
}
