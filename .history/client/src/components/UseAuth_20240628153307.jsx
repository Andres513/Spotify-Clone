import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function UseAuth({code}) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(()=> {
        axios.post('http://localhost:3001/login', {
        code,
        }).then(res => {
            console.log('res.data is: ', res.data)
        }).catch(()=>{
            window.location = '/'
        })
    },[code])

  return (
    <>
    
    </>
  )
}
