import React, { Fragment } from 'react'
import $ from 'jquery'
import AgreeIcon from '../Icons/agree'
import HujahIcon from '../Icons/hujah'
import ButtonBack from '../Layouts/button_back'

class HujahForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newHujahBody: "",
      parent: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this)
  }

  componentDidMount() {
    this.setState({parent: this.props.location.state.parent})
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }

  handleChange(event) {
    this.setState({newHujahBody: event.target.value})
  }

  handleSubmit(event) {

    event.preventDefault()
    const url = "/api/v1/hoojah/create"
    const { newHujahBody } = this.state

    if (newHujahBody.length == 0)
      return

    const body = {
      body: newHujahBody.replace(/\n/g, "<br> <br>"),
      parent_id: this.state.parent.id
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
    const { newHujahBody, parent } = this.state

    const activePostButtonClass = "shadow btn btn-outline-warning btn-rounded btn-icon-16 fill-agree"
    const inactivePostButtonClass = "shadow btn btn-outline-warning btn-rounded btn-icon-16 fill-agree disabled"

    const parentCard = (
      <Fragment>
        <div className="col-12 mb-2">
          <small>You <span className="text-agree btn-icon-14 fill-agree"><AgreeIcon /> agreed</span> to User Name's claim:</small>  
        </div>
        <div className="col-12 mb-1 pl-2 border-left-8 border-warning">
          <h6 className="text-regular pt-1">{parent.body}</h6>
        </div>
      </Fragment>
    )

    return (
      <form>
        <div className="container">
          <div className="row">
            <nav className="navbar fixed-top navbar-light">
              <div className="container px-0 d-flex justify-content-between">
                <ButtonBack />
                <button type="submit" className={newHujahBody == "" ? inactivePostButtonClass : activePostButtonClass} onClick={this.handleSubmit}>
                  <HujahIcon /> Post hoojah
                </button>
              </div>
            </nav>
            {$.isEmptyObject(parent) ? null : parentCard}
            <div className="col-12 d-flex mt-3">
              <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mr-3 avatar" />
              <textarea className="form-control new-hujah-form border-0 pl-0 bg-transparent" placeholder={"What's your hoojah?"} rows="10" value={newHujahBody} onChange={this.handleChange}></textarea>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default HujahForm
