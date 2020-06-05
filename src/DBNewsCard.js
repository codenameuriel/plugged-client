import React from 'react'
import Plug from './Plug.png'

const DBNewsCard = ({title, description, url, url_to_image}) => {
  return (
    <div>
      <h2>{title}</h2>
      <a 
        target="_blank" 
        rel="noopener noreferrer" 
        href={url}><img src={url_to_image || Plug} alt={title}/>
      </a>
      <p>{description}</p>
    </div>
  )
}

export default DBNewsCard
