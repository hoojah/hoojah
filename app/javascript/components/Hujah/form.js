import React, { Fragment } from 'react'
import $ from 'jquery'
import AgreeIcon from '../Icons/agree'
import NeutralIcon from '../Icons/neutral'
import DisagreeIcon from '../Icons/disagree'
import HujahIcon from '../Icons/hujah'
import ButtonBack from '../Layouts/button_back'
import LoadingAnimation from '../Layouts/loading_animation'

class HujahForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newHujahBody: "",
      hujahParent: {},
      isNewHujahParent: true,
      voteForHujah: ""
    }
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if(!this.props.loggedInStatus) {
      return this.redirectToLogin()
    }

    const { hujahParent } = this.props.location.state
    
    if(hujahParent.id == null) {
      this.setState({
        hujahParent: {
          id: null,
          attributes: {
            body: "",
            current_user_vote: "primary",
            user: {
              id: null
            }
          }
        },
        voteForHujah: "primary"
      })
    } else {
      this.setState({
        hujahParent: hujahParent,
        isNewHujahParent: false,
        voteForHujah: hujahParent.attributes.current_user_vote
      })
    }
  }
  
  redirectToLogin = () => {
    this.props.history.push('/login')
  }

  handleBodyChange(event) {
    this.setState({newHujahBody: event.target.value})
  }

  handleSubmit(event) {

    event.preventDefault()
    const url = "/api/v1/hoojah/create"
    const { newHujahBody, hujahParent, voteForHujah } = this.state

    if (newHujahBody.length == 0)
      return

    const body = {
      body: newHujahBody.replace(/\n/g, "<br /> <br />"),
      parent_id: hujahParent.id,
      vote: this.parseVote(voteForHujah)
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

  handleResponseVoteAgree() {
    this.setState({ 
      voteForHujah: "agree"
    })
  }

  handleResponseVoteNeutral() {
    this.setState({ 
      voteForHujah: "neutral"
    })
  }

  handleResponseVoteDisagree() {
    this.setState({ 
      voteForHujah: "disagree"
    })
  }

  render() {
    if($.isEmptyObject(this.state.hujahParent)){
      return (
        <LoadingAnimation />
      )
    }

    const { newHujahBody, hujahParent, isNewHujahParent, voteForHujah } = this.state
    const { body, current_user_vote, user } = hujahParent.attributes
    
    const displayParentCard = (
      <Fragment>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 col-md-8 pb-2 bg-white">
          <small>You {this.displayVote(current_user_vote)} to {user.id == null? null : user.attributes.full_name}'s claim:</small>  
        </div>
      </div>
      <div className="row justify-content-center">
        <div className={`col-12 col-lg-6 col-md-8 bg-white pl-2 border-left-8 border-${current_user_vote}`}>
          <h6 className="text-regular pt-1">{body}</h6>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 col-md-8 mb-1 pt-1 pb-3 bg-white">
          <small>Post this response hoojah as:</small>
          <div className="d-flex justify-content-around mt-2">
            <button type="button"
              className={`shadow btn btn-outline-agree btn-lg btn-circle btn-icon-16 fill-agree ${voteForHujah == "agree" ? "voted" : null}`} 
              onClick={() => this.handleResponseVoteAgree()}>
              <AgreeIcon />
            </button>
            <button type="button"
              className={`shadow btn btn-outline-neutral btn-lg btn-circle btn-icon-16 fill-neutral neutral ${voteForHujah == "neutral" ? "voted" : null}`} 
              onClick={() => this.handleResponseVoteNeutral()}>
              <NeutralIcon />
            </button>
            <button type="button"
              className={`shadow btn btn-outline-disagree btn-lg btn-circle btn-icon-16 fill-disagree ${voteForHujah == "disagree" ? "voted" : null}`} 
              onClick={() => this.handleResponseVoteDisagree()}>
              <DisagreeIcon />
            </button>
          </div>
        </div>
      </div></Fragment>
    )

    return (
      <form>
        <div className="container">
          <div className="row justify-content-center">
            <nav className="navbar fixed-top navbar-light">
              <div className="container px-0 d-flex justify-content-between">
                <ButtonBack />
                <button type="submit" className={`shadow btn btn-outline-${voteForHujah} btn-rounded btn-icon-16 fill-${voteForHujah} ${newHujahBody == "" ? "disabled" : null}`} onClick={this.handleSubmit}>
                  <HujahIcon /> Post hoojah
                </button>
              </div>
            </nav>
          </div>
          {!isNewHujahParent && displayParentCard}
          <div className="row justify-content-center">
            <div className="col-12 col-lg-6 col-md-8 d-flex mt-3">
              <img src={this.props.currentUser.photo} className="rounded-circle mr-3 avatar" />
              <textarea className="form-control new-hujah-form border-0 pl-0 bg-transparent" placeholder={"What's your hoojah?"} rows="10" value={newHujahBody} onChange={this.handleBodyChange}></textarea>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default HujahForm
