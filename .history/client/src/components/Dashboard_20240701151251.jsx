import React from 'react'
import UseAuth from './UseAuth'
import TrackResults from './TrackResults'
import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientID: '41d057fa0a1841388bf0cafb1110a811'
})

export default function Dashboard({ code }) {
    const accessToken = UseAuth({code})
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    console.log(searchResults)

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

                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if(image.height < smallest.height) return image
                    return smallest
                },track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
            return () => cancel = true
    })},[search, accessToken])

  return (
    <>
    <Container className='d-flex-column py-2' style={{
        height: '100vh',
    }}>
        <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e=> setSearch(e.target.value)}/>
        <div className="flex-grow-1 my-2" style={{
            overflowY: 'auto',
        }}>{searchResults.map(track => {
            <TrackSearchResults track={track} key={track.uri}/>
        })}</div>
        <div></div>
    </Container>
    
    </>
  )
}
