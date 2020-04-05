import React from 'react'
import { useHistory } from 'react-router'
import BackIcon from '../Icons/back'

function ButtonBack() {
  
  const history = useHistory()

  function handleNavigateBack() {
    history.goBack()
  }

  return (
    <button type="button" onClick={handleNavigateBack} className="btn btn-icon-24 fill-primary">
      <BackIcon />
    </button>
  )
}

export default ButtonBack
