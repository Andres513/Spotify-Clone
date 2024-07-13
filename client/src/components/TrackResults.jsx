import React from 'react'

export default function TrackResults({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }
    //d-flex m-2 align-items-center
  return (
    <>
    <div className='search-result-list'
    onClick={handlePlay}>
        <img src ={track.albumUrl} style={{height: '64px', width: '64px'}}/>
        <div className='result-item'>
            <div className='track-title'>{track.title}</div>
            <div className='artist-title'>{track.artist}</div>
        </div>
    </div>
    </>
  )
}
