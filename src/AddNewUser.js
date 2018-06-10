import React from 'react'
import ReactDOM from 'react-dom'
import './AddNewUser.css'

export default class AddNewUser extends React.Component {
  state = {
    newUserName: '',
    userAlreadyExists: false
  }
  userNameInput = React.createRef()
  componentDidMount() {
    this.bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    this.userNameInput.current.focus()
  }
  componentWillUnmount() {
    document.body.style.overflow = this.bodyOverflow
  }
  onUserNameChange = e => {
    const newUserName = e.target.value
    const userAlreadyExists = !!this.props.users.find(
      u => u.name === newUserName
    )
    this.setState({ newUserName, userAlreadyExists }, this.setInputValidity)
  }
  setInputValidity = () => {
    this.userNameInput.current.setCustomValidity(
      this.state.userAlreadyExists ? 'Username already exists' : ''
    )
  }
  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modalContent">
          <label htmlFor="newUserName">Add new user</label>
          <input
            id="newUserName"
            className="input"
            type="text"
            value={this.state.newUserName}
            onChange={this.onUserNameChange}
            ref={this.userNameInput}
          />
          <button
            type="button"
            className="btn"
            disabled={!this.state.newUserName || this.state.userAlreadyExists}
          >
            Submit
          </button>
        </div>
      </div>,
      document.body
    )
  }
}
