import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HujahIndex from '../components/HujahIndex'
import Hujah from '../components/Hujah'
import ScrollToTop from '../components/Utilities/scroll_to_top'

export default (
  <Router>
    <ScrollToTop />
    <Switch>
      <Route path='/' exact component={HujahIndex} />
      <Route path='/hoojah/:id' exact component={Hujah} />
    </Switch>
  </Router>
)