import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function UseAuth({code}) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(()=> {
        axios.post('http://localhost:3000/login', {
        code,
        }).then(res => {
            console.log(res.data)
        })
    },[code])

  return (
    <>
    
    </>
  )
}
