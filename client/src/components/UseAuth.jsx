import React, { useState, useEffect } from 'react'

export default function UseAuth({ code }) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        const fetchLogin = async () => {
            if (!code) return
            try {
                const response = await fetch('http://localhost:3001/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        code
                    }),
                })
                const req = await response.json();
                setAccessToken(req.accessToken)
                setRefreshToken(req.refreshToken)
                setExpiresIn(req.expiresIn)

                window.history.pushState({}, null, '/')

            } catch (error) {
                console.error(error)
                window.location = "/"
            }
        }
        fetchLogin()
    }, [code])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!refreshToken || !expiresIn) return
            const fetchRefresh = async () => {
                try {
                    const response = await fetch('http://localhost:3001/refresh', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            refreshToken
                        }),
                    })

                    const req = await response.json()
                    setAccessToken(req.accessToken)
                    setExpiresIn(req.expiresIn)
                } catch (error) {
                    console.log('Error refreshing access token: ', error)
                    window.location = '/'
                }
            }
            fetchRefresh()
        }, (expiresIn - 60) * 1000)

        return () => {
            clearInterval(interval)
        }
    }, [refreshToken, expiresIn])

    return accessToken
}
