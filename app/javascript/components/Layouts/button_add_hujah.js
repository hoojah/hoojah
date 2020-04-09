import React from 'react'
import { Link } from 'react-router-dom'
import HujahIcon from '../Icons/hujah'

class ButtonAddHujah extends React.Component {

  render() {
    const { hujahParent, user, vote } = this.props

    return(
      <Link to={{
        pathname: '/hoojah/new',
        state: {
          hujahParent: hujahParent,
          user: user
        }
        }} className={`shadow btn btn-lg btn-outline-${vote} btn-rounded btn-icon-16 fill-${vote}`}>
        <HujahIcon /> Add hoojah
      </Link>
    )
  }
}

export default ButtonAddHujah
