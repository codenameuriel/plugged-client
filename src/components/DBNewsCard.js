import React from 'react'
import Plug from '../assets/Plug.png'

const DBNewsCard = ({id, title, description, url, url_to_image, removeFromCollection}) => {
  let button;

  if (title !== undefined) {
    button = <button onClick={() => removeFromCollection(id)}>Remove from collection</button>
  }

  return (
    <div>
      <h2>{title}</h2>
      <a 
        target="_blank" 
        rel="noopener noreferrer" 
        href={url}><img src={url_to_image || Plug} alt={title}/>
      </a>
      <p>{description}</p>
      {button}
    </div>
  )
}

export default DBNewsCard
