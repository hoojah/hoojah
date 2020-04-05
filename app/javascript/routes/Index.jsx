import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HujahIndex from '../components/HujahIndex'
import Hujah from '../components/Hujah'
import HujahForm from '../components/Hujah/form'
import ScrollToTop from '../components/Utilities/scroll_to_top'

export default (
  <Router>
    <ScrollToTop />
    <Switch>
      <Route exact path='/' component={HujahIndex} />
      <Route exact path='/hoojah/new' component={HujahForm} />
      <Route exact path='/hoojah/:id' component={Hujah} />
    </Switch>
  </Router>
)