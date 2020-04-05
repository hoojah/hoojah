import React from 'react'
import { Link } from 'react-router-dom'
import AgreeIcon from '../Icons/agree'
import HujahIcon from '../Icons/hujah'
import ButtonBack from '../Layouts/button_back'

class HujahForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newHujahBody: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  handleChange(event) {
    this.setState({newHujahBody: event.target.value});
  }

  handleSubmit(event) {

    event.preventDefault()
    const url = "/api/v1/hoojah/create"
    const { newHujahBody } = this.state

    if (newHujahBody.length == 0)
      return

    const body = {
      body: newHujahBody.replace(/\n/g, "<br> <br>")
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
      .then(response => this.props.history.push(`/hoojah/${response.id}`))
      .catch(error => console.log(error.message))
  }

  render() {
    return (
      <form>
        <div className="container">
          <div className="row">
            <nav className="navbar fixed-top navbar-light">
              <div className="container px-0 d-flex justify-content-between">
                <ButtonBack />
                <button type="submit" className="shadow btn btn-outline-warning btn-rounded btn-icon-16 fill-agree" onClick={this.handleSubmit}>
                  <HujahIcon /> Post hoojah
                </button>
              </div>
            </nav>
            <div className="col-12 mb-2">
              <small>You <span className="text-agree btn-icon-14 fill-agree"><AgreeIcon /> agreed</span> to User Name's claim:</small>  
            </div>
            <div className="col-12 mb-4 pl-2 border-left-8 border-warning">
              <h6 className="text-regular pt-1">We should teach science & mathematics in English as early as in primary school.</h6>
            </div>
            <div className="col-12 d-flex">
              <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mr-3 avatar" />
              <textarea className="form-control new-hujah-form border-0 pl-0 bg-transparent" placeholder={"What's your hoojah?"} rows="10" value={this.state.newHujahBody} onChange={this.handleChange}></textarea>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default HujahForm
