import React from 'react'
import NewspaperTile from './NewspaperTile'

const NewspaperMapper = ({ newspapers }) => {
  console.log(newspapers)
  const renderNewspaperTiles = () => {
    return newspapers.map(newspaper => {
      return <NewspaperTile newspaper={newspaper}/>
    })
  }

  return (
    <div>
      {renderNewspaperTiles()}
    </div>
  )
}

export default NewspaperMapper
