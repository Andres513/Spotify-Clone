import React from 'react'
import UseAuth from './UseAuth'
import TrackResults from './TrackResults'
import Player from './Player'
import Profile from './Profile'
import Login from './Login'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: ''
})

export default function Dashboard({ code }) {
    // naming convention is camelCase. e.g. "useAuth"
    const accessToken = UseAuth({ code })
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [currentTrack, setCurrentTrack] = useState()
    const [backImage, setBackImage] = useState()
    // not need for state. can be derived from currentTrack
    const [trackSelected, setTrackSelected] = useState(false)
    // set variable instead of state
    // const trackSelected = !!currentTrack 

    if (!accessToken) {
        return <Login />
    }
    
    // you're using a combination of standard functions vs arrow functions.
    // should have consistency throughout application
    function chooseTrack(track) {
        setCurrentTrack(track)
        setBackImage(track.albumUrl)
        setSearch('')
    }

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])


    // Handles 'Enter' input instead of using forms
    // const onKeyDownHandler = (e) => {
    //     if (!search) return
    //     Key code 13 === Enter
    //     if (e.keyCode === 13) {
    //         spotifyApi.searchTracks(search).then(res => {
    //             setSearchResults(res.body.tracks.items.map(track => {
    //                 const largestAlbumImage = track.album.images.reduce((largest, image) => {
    //                     if (image.height > largest.height) return image
    //                     return largest
    //                 }, track.album.images[0])
    
    //                 return {
    //                     artist: track.artists[0].name,
    //                     title: track.name,
    //                     album: track.album.name,
    //                     uri: track.uri,
    //                     albumUrl: largestAlbumImage.url
    //                 }
    //             }))
    //         })
    //     }
    // }

    // Non-inline change handler fn
    // const onChangeHandler = (e) => {
    //     setSearch(e.target.value)
    // }

    // Don't handle submit/search again if search hasn't changed from previous search
    const handleSubmit = (event) => {
        event.preventDefault()

        if (trackSelected) setTrackSelected(false)
        // why reset search if there is no search?
        // maybe reset search results if it's an new search?
        if (!search) return setSearchResults([])
        // should be at top of function
        if (!accessToken) return
        // No need for cancel
        let cancel = false

        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            // More legible to create the array as a const then assign to state
            // const result = res.body.tracks.items.map(.....)
            // setSearchResults(results)
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
        // Fragment isn't needed here
        <>
            <div className='dashboard-container'>
                {/* Should profile container be part of profile component? */}
                <div className="profile-container">
                    <Profile code={code} accessToken={accessToken} />
                </div>
                <form className="search-bar" onSubmit={handleSubmit}>
                    <input
                        type='search'
                        placeholder='Search for Song/Artist'
                        value={search}
                        onChange={e => setSearch(e.target.value)} 
                        // onChange-{onChangeHandler}
                        // onKeyDown={onKeyDownHandler} 
                    />
                </form>
                <div className="results-container">
                    {
                        !trackSelected ? (
                            searchResults.map(track => (
                                <TrackResults track={track} key={track.uri} setTrackSelected={setTrackSelected}
                                    chooseTrack={chooseTrack} />))
                        ) : (
                            // No need for fragment
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
                {/* Should player container be part of player container */}
                <div className='player'>
                    <Player accessToken={accessToken} trackUri={currentTrack?.uri} />
                </div>
            </div>
        </>
    )
}
