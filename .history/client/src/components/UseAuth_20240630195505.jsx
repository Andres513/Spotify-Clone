import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function UseAuth({ code }) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        axios.post('http://localhost:3001/login', {
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(61)
            window.history.pushState({}, null, '/')
        }).catch(() => {
            window.location = '/'
        })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const timeOut = setInterval(() => {
            axios.post('http://localhost:3001/refresh', {
                refreshToken
            }).then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            }).catch(() => {
                window.location = '/'
            })
        }, (expiresIn - 60) * 1000)

        return () => {
            clearInterval(timeOut)
        }
    }, [refreshToken, expiresIn])

    return accessToken
}