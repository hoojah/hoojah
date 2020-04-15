import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from 'logo.svg'
import HomeIcon from '../Icons/home'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      email: '',
      password: '',
      errors: ''
     }
  }

  componentDidMount() {
    if(this.props.loggedInStatus) {
      return this.redirect()
    }
  }

  componentDidUpdate() {
    if(this.props.loggedInStatus) {
      return this.redirect()
    }
  }
  
  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {email, password} = this.state
    let user = {
      email: email,
      password: password
    }
    
    axios.post('/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div className="alert alert-warning" role="alert">
        <ul>
          {this.state.errors.map(error => {
          return <li key={error}>{error}</li>
            })
          }
        </ul>
      </div>
    )
  }
  
  render() {
    const { email, password } = this.state

    return (
      <div className="container">
        <div className="row justify-content-center">
          <nav className="navbar fixed-top navbar-light">
            <div className="container px-0 d-flex justify-content-between">
              <Link to="/" className="navbar-brand">
                <img src={Logo} />
              </Link>
              <div className="">
                <Link to={"/"} className="btn btn-icon-24 fill-primary">
                  <HomeIcon />
                </Link>
              </div>
            </div>
          </nav>
          <div className="col-12 col-lg-6 col-md-8 sm-fluid mb-2">
            <div className="card border-0 rounded-0">
              <div className="card-header text-center">
                Hello from Hoojah! 🎉
              </div>
              <div className="card-body text-center bg-primary text-white">
                <h5 className="card-title">Don't have an account yet?</h5>
                <Link to={"/signup"} className="btn btn-warning">Get started here!</Link>
              </div>
              <div className="card-body mb-5">
                <h5 className="card-title mt-4">Log in</h5>
                {
                  this.state.errors ? this.handleErrors() : null
                }
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      className="form-control"
                      placeholder="Enter email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                    <small className="form-text text-muted">For testing purpose, you don't need to enter a valid email.</small>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      className="form-control"
                      placeholder="Enter password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-block btn-primary">Log in</button>
                </form>
              </div>
              <div className="card-footer text-muted">
                <small>Disclaimer: Hoojah is still in development. All activities are for testing purpose. Hoojah will not be liable for any damage done during this testing period.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
