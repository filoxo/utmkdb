import React, { Component } from 'react'
import './App.css'
import List from './List'
import Add from './Add'
import Details from './Details'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav className="nav">
            <Link to="/" className="logo-wrapper">
              <span className="logo" />
              <span>UTMK DB</span>
            </Link>
            <Link to="/add">Add</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={List} />
            <Route path="/add" component={Add} />
            <Route path="/:id" component={Details} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
