import React from 'react'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => {
        setPlay(true)
    },[trackUri])

    if(!accessToken) return null
    return (
    <>
    <div className='player-container' >
        <SpotifyPlayer style={{backgroundColor: 'white'}}
        token={accessToken} 
        showSaveIcon
        callback={state =>{
            if(!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}/> 
    </div>  
    </>
  )
}
