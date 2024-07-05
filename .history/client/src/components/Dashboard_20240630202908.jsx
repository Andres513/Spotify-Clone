import React from 'react'
import UseAuth from './UseAuth'
import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'

export default function Dashboard({ code }) {
    const accessToken = UseAuth({code})
    const [search, setSearch] = useState("")
  return (
    <>
    <Container>
        <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e=> setSearch(e.target.value)}/>
    </Container>
    
    </>
  )
}
