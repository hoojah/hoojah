import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HujahIndex from '../components/HujahIndex'
import Hujah from '../components/Hujah'
import HujahForm from '../components/Hujah/form'
import ScrollToTop from '../components/Utilities/scroll_to_top'

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
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
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
          <Route exact path='/' component={HujahIndex} />
          <Route exact path='/hoojah/new' component={HujahForm} />
          <Route exact path='/hoojah/:id' component={Hujah} />
        </Switch>
      </Router>
    )
  }
}

export default App
