import React, { Component } from 'react'
import './App.css'
import api from './api'
import Card from './Card'
import Loading from './Loading'
import Observer from '@researchgate/react-intersection-observer'

class App extends Component {
  state = {
    records: [],
    fetchNextPage: null,
    done: false
  }

  loadMore = () => {
    if (!this.state.done && !!this.state.fetchNextPage) {
      this.setState({ loading: true }, this.state.fetchNextPage())
    }
  }

  componentWillMount() {
    api('Keyboards')
      .select({
        view: 'Grid view',
        fields: ['Name', 'Switches', 'Keycaps', 'Image'],
        pageSize: 12
      })
      .eachPage(
        (records, fetchNextPage) => {
          this.setState({
            records: this.state.records.concat(records),
            fetchNextPage,
            loading: false
          })
        },
        err => {
          if (err) {
            console.error(err)
          }
          this.setState({ done: true, loading: false })
        }
      )
  }

  render() {
    const { records, loading, done } = this.state
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
        <Observer onChange={this.loadMore} threshold={1}>
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            {done ? (
              <span>End of list</span>
            ) : loading ? (
              <Loading />
            ) : (
              <button type="button" className="btn" onClick={this.loadMore}>
                Load more
              </button>
            )}
          </div>
        </Observer>
      </div>
    )
  }
}

export default App
