import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from 'logo.svg'
import HomeIcon from '../Icons/home'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      full_name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
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
    const {full_name, username, email, password, password_confirmation} = this.state
    let user = {
      full_name: full_name,
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    axios.post('/users', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
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
      <div class="alert alert-warning" role="alert">
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul> 
      </div>
    )
  }

  render() {
    const {full_name, username, email, password, password_confirmation} = this.state

    return (
      <div className="container">
        <div className="row">
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
          <div className="col-12 sm-fluid mb-2">
            <div className="card border-0 rounded-0">
              <div className="card-header text-center">
                You're new here! 🥳
              </div>
              <div className="card-body">
                <h5 className="card-title">Sign up</h5>
                {
                  this.state.errors ? this.handleErrors() : null
                }
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Full name</label>
                    <input
                      className="form-control"
                      placeholder="Your name"
                      type="text"
                      name="full_name"
                      value={full_name}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>User name</label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">@</div>
                      </div>
                      <input
                        className="form-control"
                        placeholder="Your @username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      className="form-control"
                      placeholder="Your email address"
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                    <small className="form-text text-muted">For testing purpose, you won't need to validate your email.</small>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      className="form-control"
                      placeholder="Create your password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password confirmation</label>
                    <input
                      className="form-control"
                      placeholder="Re-enter your password"
                      type="password"
                      name="password_confirmation"
                      value={password_confirmation}
                      onChange={this.handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Create your account</button>
                </form>
              </div>
              <div className="card-body text-center bg-primary text-white">
                <h5 className="card-title">Already have an account?</h5>
                <Link to={"/login"} className="btn btn-warning">Click here to log in!</Link>
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

export default Signup