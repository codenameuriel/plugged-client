import React from 'react'
import Nav from './Nav'

export default function Collection({links}) {
  return (
    <div>
      <Nav links={links}/>
      <h1>Hello World!</h1>
      <p>Is anyone there?</p>
    </div>
  )
}
