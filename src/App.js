import React, { Component } from 'react'
import './App.css'
import api from './api'
import Card from './Card'

class App extends Component {
  state = {
    records: []
  }
  componentWillMount() {
    api('Keyboards')
      .select({
        maxRecords: 30,
        view: 'Grid view',
        fields: ['Name', 'Switches', 'Keycaps', 'Image']
      })
      .eachPage(
        (records, fetchNextPage) => {
          console.log(records)
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
        <h1 style={{ margin: '1.5rem', textAlign: 'center' }}>UTMK DB</h1>
        <div
          style={{
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'center'
          }}
        >
          {records.map(({ fields, id }) => <Card key={id} {...fields} />)}
        </div>
      </div>
    )
  }
}

export default App
