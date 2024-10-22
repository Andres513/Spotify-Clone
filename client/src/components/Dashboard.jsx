// You must create an app from developer.spotify.com and set the redirect URI to http://localhost:3000

// 1. Go into client folder >> src >> component >> Login.jsx and assign the client_ID variable with your client ID from your app
// 2. Go into .env file in the server folder and enter your CLIENT_ID and CLIENT_SECRET values from your spotify app basic information settings

// 3. In terminal, cd into client folder and type the following command
//     npm i

// 4. Then cd into server folder and run the following:
//     npm i

// 5. To run app, open terminal and cd into client folder and run the following:
//     npm run dev

// 6. Then open up another terminal window and cd into server folder and run the following:
//     npm run devStart


import React from 'react'
import useAuth from './UseAuth'
import TrackResults from './TrackResults'
import Player from './Player'
import Profile from './Profile'
import { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: '41d057fa0a1841388bf0cafb1110a811'
})

export default function Dashboard({ code }) {
    const accessToken = useAuth({ code })
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [currentTrack, setCurrentTrack] = useState()
    const [backImage, setBackImage] = useState()
    const [trackSelected, setTrackSelected] = useState()


    const chooseTrack = (track) => {
        setCurrentTrack(track)
        setBackImage(track.albumUrl)
        setSearch('')
    }

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    const onKeyDownHandler = (e) => {
        if (!search) return
        if (e.keyCode === 13) {
            spotifyApi.searchTracks(search).then(res => {
                const results = res.body.tracks.items.map(track => {
                    const largestAlbum = track.album.images.reduce((largest, image) => {
                        if (image.height > largest) return image
                        return largest
                    }, track.album.images[0])

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        album: track.album.name,
                        uri: track.uri,
                        albumUrl: largestAlbum.url
                    }
                })
                setSearchResults(results)
                returnHandler()
            })
        }
    }

    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }
    const returnHandler = (e) => {
        setTrackSelected(false)
    }

    return (
        <div className='dashboard-container'>
            <div className="profile-container">
                <Profile code={code} accessToken={accessToken} />
            </div>
            <input className="search-bar" type='search' placeholder='Search for Song/Artist' value={search}
                onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
            <div className="results-container">
                {
                    !trackSelected ? (
                        searchResults.map(track => (
                            <TrackResults track={track} key={track.uri}
                                chooseTrack={chooseTrack} trackSelected={trackSelected} setTrackSelected={setTrackSelected} />))
                    ) : (
                        <div className="album-cover">
                            <img src={backImage} alt="Album Cover" />
                            <h2>{currentTrack?.artist} - {currentTrack?.title}</h2>
                            <h3>{currentTrack?.album}</h3>
                            <button className="return-button" onClick={returnHandler}>Back</button>
                        </div>
                    )
                }
            </div>
            <div className='player'>
                <Player accessToken={accessToken} trackUri={currentTrack?.uri} />
            </div>
        </div>
    )
}
