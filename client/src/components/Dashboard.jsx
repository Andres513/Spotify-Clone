import React from 'react'
import UseAuth from './UseAuth'
import TrackResults from './TrackResults'
import Player from './Player'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientID: '41d057fa0a1841388bf0cafb1110a811'
})

export default function Dashboard({ code }) {
    const accessToken = UseAuth({code})
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [currentTrack, setCurrentTrack] = useState()
    const [backImage, setBackImage] = useState()

    function chooseTrack(track) {
        setCurrentTrack(track)
        setBackImage(track.albumUrl)
        console.log(track)
        setSearch('')
    }

    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    useEffect(()=> {
        if(!search) return setSearchResults([])
        if(!accessToken) return
        let cancel = false

        spotifyApi.searchTracks(search).then(res => {
            if(cancel) return
            setSearchResults(res.body.tracks.items.map(track =>{

                const largestAlbumImage = track.album.images.reduce((largest, image) => {
                    if(image.height > largest.height) return image
                    return largest
                },track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: largestAlbumImage.url
                }
            }))
            return () => cancel = true
    })},[search, accessToken])
  return (
    <>
        <div className='player-container'>
        <input type='search' placeholder='Search for Song/Artist' value={search}
        onChange={e => setSearch(e.target.value)}/>
        {
            searchResults.map(track => (
                <TrackResults track={track} key={track.uri}
                    chooseTrack={chooseTrack}/>))
            }
        <div className="track-player" style= {{backgroundImage: searchResults.length === 0 ? `url(${backImage})`: 'none'}}>
        </div>
        
        <div className='player'>
            <Player accessToken={accessToken} trackUri={currentTrack?.uri}/>
        </div>
        </div>
    
    </>
  )
}
