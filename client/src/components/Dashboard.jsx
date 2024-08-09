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
    const [clicked, setClicked] = useState(false)

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

    
    const handleSubmit = (event) => {
        event.preventDefault()

        if(clicked) setClicked(false)
        if(search.length === 0) return
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
                    album: track.album.name,
                    uri: track.uri,
                    albumUrl: largestAlbumImage.url
                }
            }))
        })
    }
 
  return (
    <>
        <div className='player-container'>
            <form className="search-results" onSubmit={handleSubmit}>
        <input type='search' placeholder='Search for Song/Artist' value={search}
        onChange={e => setSearch(e.target.value)}/>
        <button type="submit">Submit</button>
            </form>
        {
        !clicked ? (
            searchResults.map(track => (
                 <TrackResults track={track} key={track.uri} setClicked={setClicked}
                    chooseTrack={chooseTrack}/>))
            ) : (
            <div className="track-player" style= {{backgroundImage: `url(${backImage})`}}>
            </div>
            )
        } 

        <div className='player'>
            <Player accessToken={accessToken} trackUri={currentTrack?.uri}/>
        </div>
        </div>
    
    </>
  )
}
