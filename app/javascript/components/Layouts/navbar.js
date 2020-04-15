import React from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from 'logo.svg'
import HujahIcon from '../Icons/hujah'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  
  handleLogout() {
    
    axios.delete('/logout', {withCredentials: true})
    .then(response => {
      this.props.handleLogout()
      this.props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  render() {
    const {username, photo, id } = this.props.currentUser

    const userMenu = (
      <div className="dropdown">
        <img src={photo} className="dropdown-toggle rounded-circle mx-2 avatar-small" id="userMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
        <div className="dropdown-menu" aria-labelledby="userMenuButton">
          <h6 className="dropdown-header">@{username}</h6>
          <Link to={`/users/${id}`} className="dropdown-item" >Your profile</Link>
          <div className="dropdown-divider"></div>
          <Link to='/logout' className="dropdown-item" onClick={this.handleLogout}>Log Out</Link>
        </div>
      </div>
    )

    return(
      <nav className="navbar fixed-top navbar-light">
        <div className="container px-0 d-flex justify-content-between">
          <Link to="/" className="navbar-brand">
            <img src={Logo} />
          </Link>
          { 
            this.props.loggedInStatus ? 
            userMenu : 
            <Link to="/login" className="btn btn-link">Log in</Link>
          }
          <div className="">
            <Link to={{
                pathname: '/hoojah/new',
                state: {
                  hujahParent: { id: null },
                  user: { id: null }
                }
              }} className="btn btn-icon-24 fill-primary p-0">
              <HujahIcon />
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
