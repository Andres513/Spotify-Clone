import React from 'react'
import { useState, useEffect } from 'react'

export default function Profile({ accessToken }) {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  // Maybe have an error state, to display a fallback UI if the API call fails?
  // Not necessary, just recommendation

  useEffect(() => {

    const getProfile = async () => {
      // Access token should never be null
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
      }
    }
    getProfile()
  }, [accessToken])

  const handleLogOut = (event) => {
    event.preventDefault()
    window.location = '/'
  }

  return (
    // No fragment needed
    <>
      <div className='profile-container'>
        <div className="p-item">Welcome, {displayName}!</div>
        <div className="p-item">{email}</div>
        <div className="p-item">Search for a song!</div>
        <button onClick={handleLogOut} className="logout-button">Log Out</button>
      </div>
    </>
  )
}
