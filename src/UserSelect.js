import React from 'react'
import Downshift from 'downshift'
import api from './api'
import AddNewUser from './AddNewUser'
import './UserSelect.css'

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

  toggleAddNewUserModal = () => {
    this.setState({ addNewUser: !this.state.addNewUser })
  }

  addUser = user => {
    this.setState({ users: this.state.users.concat(user) })
    this.props.onSelect(user)
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
                className="menu"
                style={{ display: isOpen ? 'block' : 'none' }}
              >
                <li
                  className="option"
                  onClick={() => this.setState({ addNewUser: true })}
                  role="option"
                >
                  Add new user...
                </li>
                {this.state.users.map((user, index) => (
                  <li
                    key={user.id}
                    {...getItemProps({
                      item: user,
                      style: {
                        fontWeight:
                          this.props.selectedItem === user ? 'bold' : 'normal'
                      },
                      className: 'option',
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
        {this.state.addNewUser && (
          <AddNewUser
            users={this.state.users}
            toggle={this.toggleAddNewUserModal}
            onComplete={this.addUser}
          />
        )}
      </React.Fragment>
    )
  }
}
