import React from 'react'
import api from './api'
import './Add.css'
import UserSelect from './UserSelect'

export default class Add extends React.Component {
  state = {
    user: null,
    Name: '',
    Switches: '',
    Keycaps: '',
    Description: '',
    'For Sale': false
  }

  input = event => {
    const { name, value, checked } = event.target
    this.setState({
      [name]: checked || value
    })
  }

  submit = e => {
    e.preventDefault()
    const data = JSON.parse(JSON.stringify(this.state))
    data.Owner = [data.user.id]
    console.log(data)
  }

  render() {
    return (
      <form className="addForm" onSubmit={this.submit}>
        <div>
          <label htmlFor="name">Keyboard name</label>
          <input
            type="text"
            className="input"
            id="name"
            required
            name="Name"
            value={this.state.Name}
            onChange={this.input}
          />
        </div>
        <div>
          <label htmlFor="switches">Switches</label>
          <input
            type="text"
            className="input"
            id="switches"
            name="Switches"
            value={this.state.Switches}
            onChange={this.input}
          />
        </div>
        <div>
          <label htmlFor="keycaps">Keycaps</label>
          <input
            type="text"
            className="input"
            id="keycaps"
            name="Keycaps"
            value={this.state.Keycaps}
            onChange={this.input}
          />
        </div>
        <div>
          <label htmlFor="notes">Mods/Notes</label>
          <textarea
            id="notes"
            className="input"
            placeholder="Add information about modifications, notes, and anything extra"
            name="Description"
            value={this.state.Description}
            onChange={this.input}
          />
        </div>
        <div>
          <label htmlFor="owner">Owner</label>
          <UserSelect
            onSelect={user => this.setState({ user })}
            selectedItem={this.state.user}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="file" className="input" id="image" />
        </div>
        <div>
          <input
            type="checkbox"
            className="input"
            id="forSale"
            name="For Sale"
            checked={this.state['For Sale']}
            onChange={this.input}
          />
          <label htmlFor="forSale">For sale?</label>
        </div>
        <div>
          <button className="btn">Submit</button>
        </div>
      </form>
    )
  }
}
