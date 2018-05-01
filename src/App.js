import React, { Component } from 'react'
import './App.css'
import List from './List'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <h1
              style={{
                display: 'inline-block',
                margin: '1.5rem',
                textAlign: 'center'
              }}
            >
              UTMK DB
            </h1>
            <Link to="/">List</Link>
            <Link to="/add">Add</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={List} />
            <Route
              path="/add"
              render={props => <div>{JSON.stringify(props)}</div>}
            />
            <Route
              path="/:id"
              render={() => <div>Single keybaord record</div>}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
