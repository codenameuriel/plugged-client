import React from 'react'
import Plug from '../assets/Plug.png'

import DBNewsCardStyles from "../styles/DBNewsCard.module.css"

const DBNewsCard = ({id, title, description, url, url_to_image, removeFromCollection}) => {
  let button;

  if (title !== undefined) {
    button = <button className={DBNewsCardStyles.button} onClick={() => removeFromCollection(id)}>Remove from collection</button>
  }

  return (
    <div className={DBNewsCardStyles.newscard} >
      <h2>{title}</h2>
      <a 
        target="_blank" 
        rel="noopener noreferrer" 
        href={url}><img className={DBNewsCardStyles.img} src={url_to_image || Plug} alt={title}/>
      </a>
      <p>{description}</p>
      {button}
    </div>
  )
}

export default DBNewsCard
