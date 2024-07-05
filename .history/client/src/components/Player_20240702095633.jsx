import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, trackUri }) {
  
    if(!accessToken) return null
    return (
    <>
        <SpotifyPlayer accessToken={accessToken} 
        showSaveIcon 
        uris={trackUri ? [trackUri] : []}/>
    </>
  )
}
