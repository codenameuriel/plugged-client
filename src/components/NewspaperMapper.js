import React from 'react'
import NewspaperTile from './NewspaperTile'
import NewspaperMapperStyles from "../styles/NewspaperMapper.module.css"

const NewspaperMapper = ({ newspapers, setNewspaper, history }) => {
  // console.log(newspapers)
  const renderNewspaperTiles = () => {
    return newspapers.map(newspaper => {
      return <NewspaperTile newspaper={newspaper} setNewspaper={setNewspaper} history={history} />
    })
  }

  return (
    <div className={NewspaperMapperStyles.container} >
      {renderNewspaperTiles()}
    </div>
  )
}

export default NewspaperMapper
