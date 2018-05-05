import React from 'react'
import './Add.css'

export default class Add extends React.Component {
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
          <input type="text" className="input" id="owner" required />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="file" className="input" id="image" />
        </div>
        <div>
          <label htmlFor="forSale">For sale?</label>
          <input type="checkbox" className="input" id="forSale" />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    )
  }
}
