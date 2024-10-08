import React from 'react'
import UseAuth from './UseAuth'
import TrackResults from './TrackResults'
import Player from './Player'
import Profile from './Profile'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: 'Add your client ID here'
})

export default function Dashboard({ code }) {
    const accessToken = UseAuth({ code })
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [currentTrack, setCurrentTrack] = useState()
    const [backImage, setBackImage] = useState()
    const [trackSelected, setTrackSelected] = useState(false)

    function chooseTrack(track) {
        setCurrentTrack(track)
        setBackImage(track.albumUrl)
        setSearch('')
    }

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])


    const handleSubmit = (event) => {
        event.preventDefault()

        if (trackSelected) setTrackSelected(false)
        if (!search) return setSearchResults([])
        if (!accessToken) return
        let cancel = false

        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(res.body.tracks.items.map(track => {
                const largestAlbumImage = track.album.images.reduce((largest, image) => {
                    if (image.height > largest.height) return image
                    return largest
                }, track.album.images[0])

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
            <div className='dashboard-container'>
                <div className="profile-container">
                    <Profile code={code} accessToken={accessToken} />
                </div>
                <form className="search-bar" onSubmit={handleSubmit}>
                    <input type='search' placeholder='Search for Song/Artist' value={search}
                        onChange={e => setSearch(e.target.value)} />
                </form>
                <div className="results-container">
                    {
                        !trackSelected ? (
                            searchResults.map(track => (
                                <TrackResults track={track} key={track.uri} setTrackSelected={setTrackSelected}
                                    chooseTrack={chooseTrack} />))
                        ) : (
                            <>
                                <div className="album-cover">
                                    <img src={backImage} alt="Album Cover" />
                                    <h2>{currentTrack?.artist} - {currentTrack?.title}</h2>
                                    <h2>{currentTrack?.album}</h2>
                                    <button className="return-button" onClick={() => setTrackSelected(false)}>Back</button>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className='player'>
                    <Player accessToken={accessToken} trackUri={currentTrack?.uri} />
                </div>
            </div>
        </>
    )
}
