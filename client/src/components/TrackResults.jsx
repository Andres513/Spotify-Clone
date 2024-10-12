import React from 'react'

export default function TrackResults({ track, chooseTrack, setTrackSelected }) {

    function handlePlay() {
        chooseTrack(track)
        setTrackSelected(true)
    }

    return (
        // No need for fragment
        <>
            <div className='search-result-list'
                onClick={handlePlay}>
                <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
                <div className='result-item'>
                    <div className='track-title'>{track.title}</div>
                    <div className='artist-title'>{track.artist}</div>
                </div>
            </div>
        </>
    )
}
