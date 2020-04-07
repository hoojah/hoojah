import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HujahIndex from '../components/HujahIndex'
import Hujah from '../components/Hujah'
import HujahForm from '../components/Hujah/form'
import ScrollToTop from '../components/Utilities/scroll_to_top'
import Login from '../components/Registrations/Login'
import Signup from '../components/Registrations/Signup'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      isLoggedIn: false,
      user: {}
     }
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get('/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }
  
  render() {
    return (
      <Router>
        <ScrollToTop />
        <Switch>
          <Route 
            exact path='/hoojah/new' 
            render={props => (
            <HujahForm {...props} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route 
            exact path='/hoojah/:id' 
            render={props => (
            <Hujah {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route 
            exact path='/' 
            render={props => (
            <HujahIndex {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route 
            exact path='/login' 
            render={props => (
            <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route 
            exact path='/signup' 
            render={props => (
            <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
        </Switch>
      </Router>
    )
  }
}

export default App
