import React from 'react'
import Downshift from 'downshift'
import api from './api'
import AddNewUser from './AddNewUser'

export default class UserSelect extends React.Component {
  state = {
    users: [],
    selectedUser: null,
    addNewUser: false
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
      <React.Fragment>
        <Downshift
          onChange={this.props.onSelect}
          selectedItem={this.props.selectedItem}
          itemToString={user => (user ? user.name || user.id : '')}
        >
          {({ getInputProps, getItemProps, isOpen, highlightedIndex }) => (
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                {...getInputProps({
                  placeholder: 'Discord username',
                  className: 'input'
                })}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              />
              <ul
                style={{
                  border: '1px solid #9195a0',
                  borderTop: 'none',
                  borderBottomLeftRadius: '5px',
                  borderBottomRightRadius: '5px',
                  listStyleType: 'none',
                  margin: 0,
                  maxHeight: 200,
                  overflowY: 'scroll',
                  padding: 0,
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  right: '0',
                  backgroundColor: '#fff',
                  display: isOpen ? 'block' : 'none'
                }}
              >
                <li
                  style={{ padding: 5 }}
                  onClick={() => this.setState({ addNewUser: true })}
                >
                  Add new user...
                </li>
                {this.state.users.map((user, index) => (
                  <li
                    key={user.id}
                    {...getItemProps({
                      item: user,
                      style: {
                        backgroundColor:
                          highlightedIndex === index
                            ? 'rgba(0,0,0,0.1)'
                            : '#fff',
                        fontWeight:
                          this.props.selectedItem === user ? 'bold' : 'normal',
                        padding: 5
                      },
                      'aria-selected': this.props.selectedItem === user
                    })}
                    role="option"
                  >
                    {user.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Downshift>
        {this.state.addNewUser && <AddNewUser users={this.state.users} />}
      </React.Fragment>
    )
  }
}
