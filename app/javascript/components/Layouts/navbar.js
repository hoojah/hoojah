import React from "react"
import { Link } from 'react-router-dom'
import Logo from 'logo.svg'
import HujahIcon from '../Icons/hujah'

class Navbar extends React.Component {
  render() {
    return(
      <nav className="navbar fixed-top navbar-light">
        <div className="container px-0 d-flex justify-content-between">
          <Link to="/" className="navbar-brand">
            <img src={Logo} />
          </Link>
          <Link to="/new_hujah" className="btn btn-link">Log in</Link>
          <div className="">
            <Link to={{
                pathname: '/hoojah/new',
                state: {
                  parent: {}
                }
              }} className="btn btn-icon-24 fill-primary">
              <HujahIcon />
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
