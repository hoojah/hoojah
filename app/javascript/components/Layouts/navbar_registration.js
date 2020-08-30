import React from 'react'
import Logo from 'logo.svg'
import HomeIcon from '../Icons/home'
import { Link } from 'react-router-dom'

class NavbarRegistration extends React.Component {
  render() {
    return(
      <nav className="navbar fixed-top navbar-light">
        <div className="nav-blur" />
        <div className="container px-0 d-flex justify-content-between">
          <Link to="/" className="navbar-brand">
            <img src={Logo} />
          </Link>
          <Link to={"/"} className="btn btn-icon-24 fill-primary nav-top-menu">
            <HomeIcon />
          </Link>
        </div>
      </nav>
    )
  }
}

export default NavbarRegistration
