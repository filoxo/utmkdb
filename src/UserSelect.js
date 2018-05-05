import React from 'react'
import Downshift from 'downshift'
import api from './api'

export default class UserSelect extends React.Component {
  state = {
    users: []
  }

  componentDidMount() {
    api('Discord users')
      .select({
        maxRecords: 30,
        view: 'Grid view'
      })
      .eachPage(
        (records, fetchNextPage) => {
          this.setState({
            users: this.state.users.concat(
              records.map(record => ({
                id: record.id,
                name: record.get('Discord Username')
              }))
            )
          })
          fetchNextPage()
        },
        err => {
          if (err) {
            console.error(err)
          }
        }
      )
  }

  render() {
    return (
      <Downshift
        onChange={this.props.onSelect}
        itemToString={({ name, id }) => name || id || ''}
      >
        {({ getInputProps, getItemProps }) => (
          <div>
            <input
              type="text"
              {...getInputProps({
                placeholder: 'Discord username',
                className: 'input'
              })}
            />
            {this.state.users.map(user => (
              <div
                key={user.id}
                {...getItemProps({
                  item: user
                })}
              >
                {user.name}
              </div>
            ))}
          </div>
        )}
      </Downshift>
    )
  }
}
