import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HujahIndex from './HujahIndex'
import NotificationsIndex from './NotificationsIndex'
import Hujah from './Hujah'
import UserProfile from './UserProfile'
import HujahForm from './Hujah/form'
import ScrollToTop from './Utilities/scroll_to_top'
import Login from './Registrations/Login'
import Signup from './Registrations/Signup'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      isLoggedIn: false,
      currentUser: {}
     }
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get('/logged_in', { withCredentials: true })
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
    if(data.hasOwnProperty("user")){
      this.setState({
        isLoggedIn: true,
        currentUser: data.user
      })
    } else if(data.data.hasOwnProperty("user")) {
      this.setState({
        isLoggedIn: true,
        currentUser: data.data.user
      })
    }
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      currentUser: {}
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
              <HujahForm {...props} loggedInStatus={this.state.isLoggedIn} currentUser={this.state.currentUser} />
            )}
          />
          <Route 
            exact path='/hoojah/:id' 
            render={props => (
              <Hujah {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} currentUser={this.state.currentUser} />
            )}
          />
          <Route 
            exact path='/users/:id' 
            render={props => (
              <UserProfile {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} currentUser={this.state.currentUser} />
            )}
          />
          <Route 
            exact path='/users/:id/notifications' 
            render={props => (
              <NotificationsIndex {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} currentUser={this.state.currentUser} />
            )}
          />
          <Route 
            exact path='/' 
            render={props => (
              <HujahIndex {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} currentUser={this.state.currentUser} />
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
