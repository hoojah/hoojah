import React, { Fragment } from 'react'
import $ from 'jquery'

class UserForm extends React.Component {
  constructor(props) {
    super(props)

    const { photo, full_name, username, location, link, headline } = this.props.user.attributes
    
    this.state = {
      photo: photo,
      full_name: full_name,
      username: username,
      location: location,
      link: link,
      headline: headline,
      errors: "",
      message: ""
    }

    this.handleFullNameChange = this.handleFullNameChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleLinkChange = this.handleLinkChange.bind(this)
    this.handleHeadlineChange = this.handleHeadlineChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFullNameChange(event) {
    this.setState({ full_name: event.target.value })
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value })
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value })
  }

  handleLinkChange(event) {
    this.setState({ link: event.target.value })
  }

  handleHeadlineChange(event) {
    this.setState({ headline: event.target.value })
  }

  handleSubmit(event) {

    event.preventDefault()
    const url = `/api/v1/users/${this.props.user.id}/update`
    const { photo, full_name, username, location, link, headline } = this.state

    const body = {
      photo: photo,
      full_name: full_name,
      username: username,
      location: location,
      link: link,
      headline: headline,
    }

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => {
        this.props.updateUserState(response.data)
        $('#userEditModal').modal('hide')
      })
      .catch(error => console.log(error.message))
  }

  render() {
    const { photo, full_name, username, location, link, headline } = this.state

    return (
      <div className="modal fade" id="userEditModal" tabIndex="-1" role="dialog" aria-labelledby="userEditModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userEditModalLabel">Edit your profile</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {
                this.state.errors ? this.handleErrors() : null
              }
              <form>
                <div className="form-group text-right">
                  <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save changes</button>
                </div>
                <div className="form-group">
                  <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_100,w_100/kjpulst4m0yei0cnsbbo.png" className="rounded-circle mb-3" />
                </div>
                <div className="form-group">
                  <label htmlFor="full-name" className="col-form-label">Full name</label>
                  <input type="text" placeholder="Your name" value={full_name} className="form-control" id="full-name" onChange={this.handleFullNameChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="username" className="col-form-label">User name</label>
                  <div className="input-group mb-2">
                    <div className="input-group-prepend">
                      <div className="input-group-text">@</div>
                    </div>
                    <input type="text" placeholder="Your @username" value={username} className="form-control" id="username" onChange={this.handleUsernameChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="location" className="col-form-label">Location</label>
                  <input type="text" placeholder="Where you're from" value={location} className="form-control" id="location" onChange={this.handleLocationChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="link" className="col-form-label">Link</label>
                  <input type="text" placeholder="Your website" value={link} className="form-control" id="link" onChange={this.handleLinkChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="headline" className="col-form-label">Headline</label>
                  <textarea placeholder="Add some jazz to your profile!" value={headline} className="form-control" rows="3" id="headline" onChange={this.handleHeadlineChange}></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserForm
