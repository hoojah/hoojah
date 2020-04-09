import React from 'react'
import { Link } from 'react-router-dom'
import AgreeIcon from '../Icons/agree'
import NeutralIcon from '../Icons/neutral'
import DisagreeIcon from '../Icons/disagree'
import ViewsIcon from '../Icons/views'
import VotesIcon from '../Icons/votes'
import HujahIcon from '../Icons/hujah'
import HujahCardHeader from './card_header'
import ButtonAddHujah from '../Layouts/button_add_hujah'

class HujahCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hujah: {
        id: null,
        type: "",
        attributes: {
          body: "",
          current_user_vote: null,
          agree_count: null,
          neutral_count: null,
          disagree_count: null,
          parent: {
            id: null,
            body: "",
            username: "",
            full_name: ""
          }
        }
      },
      totalVoteCount: 100,
      showAddHujahButton: false,
      vote: ""
    };
  }
  
  // TODO: animate vote bar 
  componentDidMount() {
    this.setState({ 
      hujah: this.props.hujah,
      totalVoteCount: this.props.totalVoteCount
     })
  }

  updateVote(vote) {

    const url = "/api/v1/votes/create"

    const body = {
      vote: vote,
      hujah_id: this.state.hujah.id,
      user_id: this.props.currentUser.id
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
      .catch(error => console.log(error.message))
  }

  calculatePercentage(voteCount) {
    const percentage = voteCount * 100 / this.state.totalVoteCount
    return `${percentage}%`
  }

  handleVoteAgree() {
    if(!this.props.loggedInStatus) {
      return this.redirect()
    }
    const newHujahState = Object.assign({}, this.state.hujah)
    var addToTotalVoteCount = 0
    if(newHujahState.attributes.current_user_vote == "agree") {
      return
    } else {
      newHujahState.attributes.agree_count = newHujahState.attributes.agree_count + 1
      if(newHujahState.attributes.current_user_vote == "neutral") {
        newHujahState.attributes.neutral_count = newHujahState.attributes.neutral_count - 1
      } else if(newHujahState.attributes.current_user_vote == "disagree") {
        newHujahState.attributes.disagree_count = newHujahState.attributes.disagree_count - 1
      }
      if(newHujahState.attributes.current_user_vote == null) {
        addToTotalVoteCount = 1
      }
      newHujahState.attributes.current_user_vote = "agree"
    }
    this.setState({ 
      hujah: newHujahState,
      totalVoteCount: this.state.totalVoteCount + addToTotalVoteCount,
      showAddHujahButton: true
    })
    this.updateVote(1)
  }

  handleVoteNeutral() {
    if(!this.props.loggedInStatus) {
      return this.redirect()
    }
    const newHujahState = Object.assign({}, this.state.hujah)
    var addToTotalVoteCount = 0
    if(newHujahState.attributes.current_user_vote == "neutral") {
      return
    } else {
      newHujahState.attributes.neutral_count = newHujahState.attributes.neutral_count + 1
      if(newHujahState.attributes.current_user_vote == "agree") {
        newHujahState.attributes.agree_count = newHujahState.attributes.agree_count - 1
      } else if(newHujahState.attributes.current_user_vote == "disagree") {
        newHujahState.attributes.disagree_count = newHujahState.attributes.disagree_count - 1
      }
      if(newHujahState.attributes.current_user_vote == null) {
        addToTotalVoteCount = 1
      }
      newHujahState.attributes.current_user_vote = "neutral"
    }
    this.setState({ 
      hujah: newHujahState,
      totalVoteCount: this.state.totalVoteCount + addToTotalVoteCount,
      showAddHujahButton: true
    })
    this.updateVote(2)
  }

  handleVoteDisagree() {
    if(!this.props.loggedInStatus) {
      return this.redirect()
    }
    const newHujahState = Object.assign({}, this.state.hujah)
    var addToTotalVoteCount = 0
    if(newHujahState.attributes.current_user_vote == "disagree") {
      return
    } else {
      newHujahState.attributes.disagree_count = newHujahState.attributes.disagree_count + 1
      if(newHujahState.attributes.current_user_vote == "agree") {
        newHujahState.attributes.agree_count = newHujahState.attributes.agree_count - 1
      } else if(newHujahState.attributes.current_user_vote == "neutral") {
        newHujahState.attributes.neutral_count = newHujahState.attributes.neutral_count - 1
      }
      if(newHujahState.attributes.current_user_vote == null) {
        addToTotalVoteCount = 1
      }
      newHujahState.attributes.current_user_vote = "disagree"
    }
    this.setState({ 
      hujah: newHujahState,
      totalVoteCount: this.state.totalVoteCount + addToTotalVoteCount,
      showAddHujahButton: true
    })
    this.updateVote(3)
  }
  
  redirect = () => {
    this.props.history.push('/login')
  }

  render() {
    const { hujah, totalVoteCount, showAddHujahButton, vote } = this.state
    const { hujahParent, currentUser, user } = this.props

    const showVoteBar = (
      <div className="card-body p-0">
        <div className="d-flex justify-content-around vote-bar">
          <div className="vote bg-agree" style={{ width: this.calculatePercentage(hujah.attributes.agree_count) }}></div>
          <div className="vote bg-neutral" style={{ width: this.calculatePercentage(hujah.attributes.neutral_count) }}></div>
          <div className="vote bg-disagree" style={{ width: this.calculatePercentage(hujah.attributes.disagree_count) }}></div>
        </div>
      </div>
    )
console.log(this.state)
    return(
      <div className="col-12 sm-fluid mb-3">
        <div className="shadow card border-0 rounded-0">
          <HujahCardHeader hujah={hujah} hujahParent={ hujahParent == null ? null : hujahParent } user={user} />
          <div className="card-body pb-0">
            <Link to={`/hoojah/${hujah.id}`}>
              <h5 className="card-title text-black text-regular">{hujah.attributes.body}</h5>
            </Link>
          </div>
          <div className={`card-body pt-0 ${showAddHujahButton ? "d-flex justify-content-between" : null}`}>
            <div className={`d-flex justify-content-${showAddHujahButton ? "between" : "around"}`}>
              <button className={`shadow btn btn-outline-agree btn-lg btn-circle btn-icon-16 fill-agree ${hujah.attributes.current_user_vote == "agree" ? "voted" : null} ${showAddHujahButton ? "mr-2" : null}`} onClick={() => this.handleVoteAgree()}><AgreeIcon /></button>
              <button className={`shadow btn btn-outline-neutral btn-lg btn-circle btn-icon-16 fill-neutral neutral ${hujah.attributes.current_user_vote == "neutral" ? "voted" : null} ${showAddHujahButton ? "mr-2" : null}`} onClick={() => this.handleVoteNeutral()}><NeutralIcon /></button>
              <button className={`shadow btn btn-outline-disagree btn-lg btn-circle btn-icon-16 fill-disagree ${hujah.attributes.current_user_vote == "disagree" ? "voted" : null}`} onClick={() => this.handleVoteDisagree()}><DisagreeIcon /></button>
            </div>
            {showAddHujahButton ? <ButtonAddHujah hujahParent={hujah} user={user} vote={hujah.attributes.current_user_vote} /> : null}
          </div>
          {totalVoteCount > 0 ? showVoteBar : null}
          <div className="card-footer d-flex justify-content-between text-grey">
            <div className="d-flex align-items-center text-14 btn-icon-14 fill-grey">
              <ViewsIcon />
              <span className="ml-1">348</span>
              <span className="mx-2">·</span>
              <VotesIcon />
              <span className="ml-1">{totalVoteCount}</span>
              <span className="mx-2">·</span>
              <HujahIcon />
              <span className="ml-1">55</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HujahCard
