import React from 'react'
import api from './api'
import './Add.css'
import UserSelect from './UserSelect'
import { partial, copyObject } from './helpers'

export default class Add extends React.Component {
  state = {
    user: null,
    Name: '',
    Switches: '',
    Keycaps: '',
    Description: '',
    'For Sale': false,
    Image: []
  }

  input = event => {
    const { name, value, checked, type } = event.target
    this.setState({
      [name]: type === 'checkbox' ? checked : value
    })
  }

  inputImage = (i, e) => {
    const Image = [...this.state.Image]
    Image[i] = e.target.value
    this.setState({ Image })
  }

  submit = e => {
    e.preventDefault()
    const data = copyObject(this.state)
    data.Owner = [data.user.id]
    delete data.user
    data.Image = data.Image.map(url => ({ url }))
    api('Keyboards').select(data, (err, record) => {
      this.props.history.push('/' + record.id)
    })
  }

  addImgUrl = () => {
    this.setState({ Image: [...this.state.Image, ''] })
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
          <fieldset>
            <legend>Images</legend>
            {this.state.Image.map((url, i) => (
              <input
                type="url"
                className="input"
                placeholder="Public image url"
                key={`Image.${i}`}
                value={url}
                onChange={partial(this.inputImage, i)}
              />
            ))}
            <button
              className="btn small"
              type="button"
              onClick={this.addImgUrl}
            >
              Add image url
            </button>
            <div>
              <small>
                Airtable will download the file at the given url and keep a
                copy.
              </small>
            </div>
          </fieldset>
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
