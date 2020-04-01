import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HujahIndex from '../components/HujahIndex'

export default (
  <Router>
    <Switch>
      <Route path='/' exact component={HujahIndex} />
    </Switch>
  </Router>
)