import React from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from 'logo.svg'
import HujahIcon from '../Icons/hujah'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  
  handleClick() {
    
    axios.delete('/logout', {withCredentials: true})
    .then(response => {
      this.props.handleLogout()
      this.props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  render() {
    console.log("navbar props")
    console.log(this.props)
    return(
      <nav className="navbar fixed-top navbar-light">
        <div className="container px-0 d-flex justify-content-between">
          <Link to="/" className="navbar-brand">
            <img src={Logo} />
          </Link>
          { 
            this.props.loggedInStatus ? 
            <Link to='/logout' onClick={this.handleClick}>Log Out</Link> : 
            <Link to="/login" className="btn btn-link">Log in</Link>
          }
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
