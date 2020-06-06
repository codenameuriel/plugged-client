import React from 'react'
import Plug from './Plug.png'

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


// function NewsCard({author, content, publishedAt, source, title, description, url, urlToImage, loggedInUser, postArticle}) {
//   let article = {
//     author: author,
//     content: content,
//     description: description,
//     published_at: publishedAt,
//     source: source.name,
//     title: title,
//     url: url,
//     url_to_image: urlToImage
//   }

//   let button;

//   if (loggedInUser.username) {
//     button = <button onClick={() => {
//       postArticle(article)
//       alert('article was added to your collection!')
//     }}>Add to collection</button>
//   }

//   return (
//     <div>
//       <h2>{title}</h2>
//       <a target="_blank" rel="noopener noreferrer" href={url}><img src={urlToImage || Plug} alt={title}/></a>
//       <p>{description}</p>
//       {button}
//     </div>
//   )
// }
