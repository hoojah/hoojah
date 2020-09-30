import React from 'react'
import { useHistory } from 'react-router'
import BackIcon from '../Icons/back'

function ButtonBack() {
  
  const history = useHistory()

  function handleNavigateBack() {
    history.goBack()
  }

  return (
    <button type="button" onClick={handleNavigateBack} className="d-flex btn btn-icon-24 fill-primary">
      <BackIcon /><span className="d-none d-md-inline-block ml-2 text-primary">Back</span>
    </button>
  )
}

export default ButtonBack
