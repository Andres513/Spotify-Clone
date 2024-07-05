import React from 'react'
import { useState, useEffect } from 'react'
import SpotifyWebPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => {
        setPlay(true)
    },[trackUri])

    if(!accessToken) return null
    return (
    <>
    
        <SpotifyWebPlayer styles ={{
            //activeColor: 'white',
            bgColor: 'grey'
        }}
        token={accessToken} 
        showSaveIcon
        callback={state =>{
            if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}/>
    </>
  )
}
