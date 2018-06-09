import React from 'react'
import ReactDOM from 'react-dom'
import './AddNewUser.css'

export default class AddNewUser extends React.Component {
  state = {
    newUserName: '',
    userAlreadyExists: false
  }
  componentDidMount() {
    this.bodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  componentWillUnmount() {
    document.body.style.overflow = this.bodyOverflow
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
            onChange={e => this.setState({ newUserName: e.target.value })}
          />
          <button type="button" className="btn" disabled={true}>
            Submit
          </button>
        </div>
      </div>,
      document.body
    )
  }
}
