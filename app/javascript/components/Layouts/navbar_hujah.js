import React from 'react'
import { Link } from 'react-router-dom'
import MoreActionsIcon from '../Icons/more_actions'
import ButtonBack from '../Layouts/button_back'

class NavbarHujah extends React.Component {
  render() {
    return(
      <nav className="navbar bg-transparent pt-0">
        <div className="container px-0 d-flex justify-content-between">
          <ButtonBack />
          <Link to="/" className="btn btn-icon-24 fill-primary">
            <MoreActionsIcon />
          </Link>
        </div>
      </nav>
    )
  }
}

export default NavbarHujah
