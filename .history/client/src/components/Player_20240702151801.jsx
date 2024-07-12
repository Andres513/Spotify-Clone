import React from 'react'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() => {
        setPlay(true)
    },[trackUri])

    if(!accessToken) return null
    return (
    <>
    <Container styles={{
        bgColor: 'white',
    }}>
        <SpotifyPlayer 
        token={accessToken} 
        showSaveIcon
        callback={state =>{
            if(!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}/>   
        </Container>
    </>
  )
}