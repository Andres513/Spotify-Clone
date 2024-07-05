import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    if(!accessToken) return null
    return (
    <>
        <SpotifyPlayer token={accessToken} 
        showSaveIcon
        play={true}
        uris={trackUri ? [trackUri] : []}/>
    </>
  )
}
