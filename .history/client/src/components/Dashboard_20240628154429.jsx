import React from 'react'
import UseAuth from './UseAuth'

export default function Dashboard({ code }) {
    const accessToken = UseAuth({code})
  return (
    <>
    <div>{code}</div>
    </>
  )
}
