import React, { Fragment } from 'react'
import $ from 'jquery'
import AgreeIcon from '../Icons/agree'
import NeutralIcon from '../Icons/neutral'
import DisagreeIcon from '../Icons/disagree'
import HujahIcon from '../Icons/hujah'
import ButtonBack from '../Layouts/button_back'

class HujahForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newHujahBody: "",
      user: {
        id: null,
        attributes: {
          username: "",
          full_name: ""
        }
      },
      hujahParent: { 
        id: null,
        attributes: {
          body: "",
          current_user_vote: null
        }
      },
      newHujahParent: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this)
  }

  componentDidMount() {
    if(!this.props.loggedInStatus) {
      return this.redirect()
    }

    const { user, hujahParent } = this.props.location.state
    
    if(hujahParent.id == null) {
      this.setState({
        user: user,
        hujahParent: {
          id: null,
          attributes: {
            body: "",
            current_user_vote: "primary"
          }
        }
      })
    } else {
      this.setState({
        user: user,
        hujahParent: hujahParent,
        newHujahParent: false
      })
    }
  }
  
  redirect = () => {
    this.props.history.push('/login')
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
    const { newHujahBody, hujahParent } = this.state

    if (newHujahBody.length == 0)
      return

    const body = {
      body: newHujahBody.replace(/\n/g, "<br /> <br />"),
      parent_id: this.state.hujahParent.id,
      vote: this.parseVote(hujahParent.attributes.current_user_vote)
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

  parseVote(vote) {
    if(vote == "agree") {
      return 1
    } else if(vote == "neutral") {
      return 2
    } else if(vote == "disagree") {
      return 3
    } else {
      return null
    }
  }

  displayVote(current_user_vote) {
    if(current_user_vote == "agree"){
      return (
        <span className={`text-${current_user_vote} btn-icon-14 fill-${current_user_vote}`}>
          <AgreeIcon /> agreed
        </span>
      )
    } else if(current_user_vote == "neutral"){
      return (
        <span className={`text-${current_user_vote} btn-icon-14 fill-${current_user_vote}`}>
          <NeutralIcon /> were neutral
        </span>
      )
    } else if(current_user_vote == "disagree"){
      return (
        <span className={`text-${current_user_vote} btn-icon-14 fill-${current_user_vote}`}>
          <DisagreeIcon /> disagreed
        </span>
      )
    }
  }

  render() {
    const { newHujahBody, user, hujahParent, newHujahParent } = this.state
    const { body, current_user_vote } = hujahParent.attributes

    const displayParentCard = (
      <Fragment>
        <div className="col-12 mb-2">
          <small>You {this.displayVote(current_user_vote)} to {user.id == null? null : user.attributes.full_name}'s claim:</small>  
        </div>
        <div className={`col-12 mb-1 pl-2 border-left-8 border-${current_user_vote}`}>
          <h6 className="text-regular pt-1">{body}</h6>
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
                <button type="submit" className={`shadow btn btn-outline-${current_user_vote} btn-rounded btn-icon-16 fill-${current_user_vote} ${newHujahBody == "" ? "disabled" : null}`} onClick={this.handleSubmit}>
                  <HujahIcon /> Post hoojah
                </button>
              </div>
            </nav>
            {!newHujahParent && displayParentCard}
            <div className="col-12 d-flex mt-3">
              <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/kjpulst4m0yei0cnsbbo.png" className="rounded-circle mr-3 avatar" />
              <textarea className="form-control new-hujah-form border-0 pl-0 bg-transparent" placeholder={"What's your hoojah?"} rows="10" value={newHujahBody} onChange={this.handleChange}></textarea>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default HujahForm
