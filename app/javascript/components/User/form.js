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
      message: "",
      hasUpdates: false
    }

    this.handleFullNameChange = this.handleFullNameChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleLinkChange = this.handleLinkChange.bind(this)
    this.handleHeadlineChange = this.handleHeadlineChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handlePhotoChange = this.handlePhotoChange.bind(this)
  }

  handleFullNameChange(event) {
    this.setState({ 
      full_name: event.target.value,
      hasUpdates: true
    })
  }

  handleUsernameChange(event) {
    this.setState({ 
      username: event.target.value,
      hasUpdates: true
    })
  }

  handleLocationChange(event) {
    this.setState({ 
      location: event.target.value,
      hasUpdates: true
    })
  }

  handleLinkChange(event) {
    this.setState({ 
      link: event.target.value,
      hasUpdates: true
    })
  }

  handleHeadlineChange(event) {
    this.setState({ 
      headline: event.target.value,
      hasUpdates: true
    })
  }

  handlePhotoChange() {
    let currentComponent = this
    cloudinary.openUploadWidget({ cloud_name: 'hoojah', upload_preset: 'user_photo', tags:['user_photo']},
      function(error, result) {
        currentComponent.setState({ 
          photo: result[0].secure_url,
          hasUpdates: true
        })
      }
    )
  }

  handleSubmit(event) {

    event.preventDefault()
    const { photo, full_name, username, location, link, headline } = this.state
    const url = `/api/v1/${username}/update`

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
    const { photo, full_name, username, location, link, headline, hasUpdates } = this.state

    var saveButton = ""
    
    if(hasUpdates){
      saveButton = (
        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save changes</button>
      )
    } else {
      saveButton = (
        <button type="button" className="btn btn-primary disabled">Save changes</button>
      )
    }

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
                  {saveButton}
                </div>
                <div className="form-group d-flex justify-content-center flex-column">
                  <img src={photo} className="rounded-circle mb-3 avatar-large mx-auto" />
                  <button type="button" onClick={this.handlePhotoChange} className="btn btn-outline-primary">Update photo</button>
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
