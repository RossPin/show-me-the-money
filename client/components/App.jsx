import React from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Meeting from './Meeting'
import History from './History'
import MeetingSummary from './MeetingSummary'

const App = ({auth}) => {
  const redirect = auth.isAuthenticated ? History : Login
  return (
    <Router>
      <div className="container has-text-centered">

        <div className="hero is-small is-primary">
          <div className="hero-body has-text-centered">
            <Link to='/' className="">
              <h1 className="title is-1">$how Me The Money</h1>
            </Link>
            <Nav />
          </div>
        </div>

        <div className=''>
          <Route exact path="/" component={redirect} />          
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/meeting" component={Meeting} />
          <Route path="/history" component={History} />
          <Route path='/meeting/:id' component={MeetingSummary} />
        </div>

      </div>
    </Router>
  )
}

const mapStateToProps = ({auth}) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)
