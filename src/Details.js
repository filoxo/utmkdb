import React from 'react'
import api from './api'

export default class Details extends React.Component {
  state = {
    data: {}
  }
  componentDidMount() {
    api('Keyboards').find(this.props.match.params.id, (err, record) => {
      if (!err) {
        this.setState({ data: record.fields })
      }
    })
  }
  render() {
    return <div>{JSON.stringify(this.state.data)}</div>
  }
}
