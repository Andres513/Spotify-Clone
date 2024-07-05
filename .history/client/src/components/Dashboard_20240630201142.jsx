import React from 'react'
import UseAuth from './UseAuth'
import { Container, Form } from 'react-bootstrap'

export default function Dashboard({ code }) {
    const accessToken = UseAuth({code})
  return (
    <>
    <div>{code}</div>
    </>
  )
}
