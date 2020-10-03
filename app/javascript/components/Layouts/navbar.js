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

    let notificationMessage = ""
    if(this.props.unreadNotificationsCount > 0) {
      notificationMessage = (
        <div className="nav-notification">
          Your notifications <span>{this.props.unreadNotificationsCount}</span>
        </div>
      )
    } else {
      notificationMessage = "Your notifications"
    }

    const notificationIndicator = (
      <span className="notification-indicator"></span>
    )

    const userMenu = (
      <div className="dropdown">
        <img src={photo} className={`dropdown-toggle rounded-circle mx-2 avatar-small `} id="userMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
        {this.props.unreadNotificationsCount > 0 ? notificationIndicator: null}
        <div className="dropdown-menu" aria-labelledby="userMenuButton">
          <h6 className="dropdown-header">@{username}</h6>
          <Link to={`/users/${id}`} className="dropdown-item" >Your profile</Link>
          <Link to={`/users/${id}/notifications`} className="dropdown-item">{notificationMessage}</Link>
          <div className="dropdown-divider"></div>
          <Link to='/logout' className="dropdown-item" onClick={this.handleLogout}>Log Out</Link>
        </div>
      </div>
    )

    return(
      <nav className="navbar fixed-top navbar-light">
        <div className="nav-blur" />
        <div className="container px-0 d-flex justify-content-between">
          <Link to="/" className="navbar-brand">
            <img src={Logo} />
          </Link>
          { 
            this.props.loggedInStatus ? 
            userMenu : 
            <Link to="/login" className="btn btn-link nav-top-menu">Log in</Link>
          }
          <Link to={{
              pathname: '/hoojah/new',
              state: {
                hujahParent: { id: null },
                user: { id: null }
              }
            }} className="btn btn-icon-24 fill-primary p-0 nav-top-menu">
            <HujahIcon />
            <span className="d-none d-lg-inline text-primary"> New Claim</span>
          </Link>
        </div>
      </nav>
    )
  }
}

export default Navbar
