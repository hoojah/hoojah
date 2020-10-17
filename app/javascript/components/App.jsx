import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HujahIndex from './HujahIndex'
import NotificationsIndex from './NotificationsIndex'
import Hujah from './Hujah'
import UserProfile from './UserProfile'
import HujahForm from './Hujah/form'
import ScrollToTop from './Utilities/scroll_to_top'
import Login from './Start/Login'
import Signup from './Start/Signup'
import { ReactQueryDevtools } from 'react-query-devtools'
import packageJson from '../../../package.json'
import Drift from "react-driftjs"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      isLoggedIn: false,
      currentUser: {},
      unreadNotificationsCount: 0
     }
  }

  componentDidMount() {
    console.log(`-------------------\n\n${packageJson.name} v${packageJson.version}\nmade in Malaysia 🇲🇾\nby ${packageJson.author}\nand fellow friends!\n\n-------------------\n\nDoing good is contagious!\n\nI am building Hoojah and\ncollecting data so that we\ncan one day write a super\naccurate algorithm to help\nMalaysians figure out where\ndo they REALLY want to eat.\n\nIf you believe that you\ncan do some good for Hoojah,\nyou are welcome to reach\nus at hello@hoojah.my\n\n💪🐤💪\n\n`)

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
        currentUser: data.user,
        unreadNotificationsCount: data.unread_notifications_count
      })
    } else if(data.data.hasOwnProperty("user")) {
      this.setState({
        isLoggedIn: true,
        currentUser: data.data.user,
        unreadNotificationsCount: data.data.unread_notifications_count
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
            exact path='/hoojah/:slug' 
            render={props => (
              <Hujah {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} currentUser={this.state.currentUser} unreadNotificationsCount={this.state.unreadNotificationsCount} />
            )}
          />
          <Route 
            exact path='/:username' 
            render={props => (
              <UserProfile {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} currentUser={this.state.currentUser} unreadNotificationsCount={this.state.unreadNotificationsCount} />
            )}
          />
          <Route 
            exact path='/:username/notifications' 
            render={props => (
              <NotificationsIndex {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} currentUser={this.state.currentUser} unreadNotificationsCount={this.state.unreadNotificationsCount} />
            )}
          />
          <Route 
            exact path='/' 
            render={props => (
              <HujahIndex {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} currentUser={this.state.currentUser} unreadNotificationsCount={this.state.unreadNotificationsCount} />
            )}
          />
          <Route 
            exact path='/start/login' 
            render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
          <Route 
            exact path='/start/signup' 
            render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />
            )}
          />
        </Switch>
        <ReactQueryDevtools initialIsOpen />
        <Drift appId="fx42y6ieyaff" />
        <div className="app-version-overlay">alpha v{packageJson.version}</div>
      </Router>
    )
  }
}

export default App
