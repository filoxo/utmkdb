import React, { Component } from 'react'
import './App.css'
import api from './api'

class App extends Component {
  state = {
    records: []
  }
  componentWillMount() {
    api('Keyboards')
      .select({
        maxRecords: 30,
        view: 'Grid view'
      })
      .eachPage(
        (records, fetchNextPage) => {
          this.setState({ records })
          // fetchNextPage();
        },
        err => {
          if (err) {
            console.error(err)
            return
          }
        }
      )
  }
  render() {
    const { records } = this.state
    return (
      <div className="App">
        <h1>UTMK DB</h1>
        <div
          style={{
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'center'
          }}
        >
          {records.map(record => (
            <div
              key={record.id}
              style={{
                background: 'white',
                width: '20rem',
                boxShadow: '0 3px 5px rgba(0,0,0,.3)',
                margin: '0 1rem 1rem 0',
                padding: '.5rem'
              }}
            >
              <h3 style={{ margin: 0 }}>{record.fields.Name}</h3>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App
