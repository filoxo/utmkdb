import React from 'react'
import './Add.css'
import UserSelect from './UserSelect'

export default class Add extends React.Component {
  state = {
    user: null
  }
  submit = e => {
    e.preventDefault()
  }
  render() {
    return (
      <form className="addForm" onSubmit={this.submit}>
        <div>
          <label htmlFor="name">Keyboard name</label>
          <input type="text" className="input" id="name" required />
        </div>
        <div>
          <label htmlFor="switches">Switches</label>
          <input type="text" className="input" id="switches" />
        </div>
        <div>
          <label htmlFor="keycaps">Keycaps</label>
          <input type="text" className="input" id="keycaps" />
        </div>
        <div>
          <label htmlFor="notes">Mods/Notes</label>
          <textarea
            id="notes"
            className="input"
            placeholder="Add information about modifications, notes, and anything extra"
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
          <input type="checkbox" className="input" id="forSale" />
          <label htmlFor="forSale">For sale?</label>
        </div>
        <div>
          <button className="btn">Submit</button>
        </div>
      </form>
    )
  }
}
