import React from 'react'
import NewspaperTile from './NewspaperTile'

const NewspaperMapper = ({ newspapers, setNewspaper, history }) => {
  // console.log(newspapers)
  const renderNewspaperTiles = () => {
    return newspapers.map(newspaper => {
      return <NewspaperTile newspaper={newspaper} setNewspaper={setNewspaper} history={history} />
    })
  }

  return (
    <div>
      {renderNewspaperTiles()}
    </div>
  )
}

export default NewspaperMapper
