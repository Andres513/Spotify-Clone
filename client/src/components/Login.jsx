import React from 'react'

const client_ID = '41d057fa0a1841388bf0cafb1110a811'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login() {
  return (
    <div className='button-container'>
      <a className='login-button' href={AUTH_URL}>Log Into Spotify</a>
    </div>
  )
}
