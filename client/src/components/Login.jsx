import React from 'react'

const client_ID = 'Enter your client ID here'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

export default function Login(){
  return (
    <>
    <div className='button-container'>
      <a className='login-button' href={AUTH_URL}>Log Into Spotify</a>
    </div>
    </>
  )
}
 