import React from "react"
import { Link } from 'react-router-dom'
import MoreActionsIcon from '../Icons/more_actions'
import BackIcon from '../Icons/back'

class NavbarHujah extends React.Component {
  render() {
    return(
      <nav className="navbar fixed-top navbar-light">
        <div className="container px-0 d-flex justify-content-between">
          <Link to="/" className="btn btn-icon-24 fill-primary">
            <BackIcon />
          </Link>
          <Link to="/hujah" className="btn btn-icon-24 fill-primary">
            <MoreActionsIcon />
          </Link>
        </div>
      </nav>
    )
  }
}

export default NavbarHujah
