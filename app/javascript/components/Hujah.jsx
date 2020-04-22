import React from 'react'
import $ from 'jquery'
import Linkify from 'react-linkify'
import Navbar from './Layouts/navbar'
import MoreActionsIcon from './Icons/more_actions'
import ButtonBack from './Layouts/button_back'
import ButtonAddHujah from './Layouts/button_add_hujah'
import LoadingAnimation from './Layouts/loading_animation'
import AgreeIcon from './Icons/agree'
import NeutralIcon from './Icons/neutral'
import DisagreeIcon from './Icons/disagree'
import ViewsIcon from './Icons/views'
import VotesIcon from './Icons/votes'
import HujahIcon from './Icons/hujah'
import HujahCardHeader from './Hujah/card_header'
import HujahCardSmall from './Hujah/card_small'
import { ThemeContext } from './theme';


class Hujah extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      hujah: {},
      totalVoteCount: 0,
      hujahResponseFilter: "all",
      hujahParentAvailable: false,
      hujahChildrenAvailable: false
    }
    this.deleteHujah = this.deleteHujah.bind(this)
    this.handleFilterClick = this.handleFilterClick.bind(this)
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props

    const url = `/api/v1/hoojah/${id}`

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => {
        const hujah = response.data
        const { agree_count, neutral_count, disagree_count } = hujah.attributes

        this.setState({ 
          hujah: hujah,
          hujahParentAvailable: hujah.attributes.hasOwnProperty("parent"),
          hujahChildrenAvailable: hujah.attributes.hasOwnProperty("children"),
          totalVoteCount: agree_count + neutral_count + disagree_count
        })
      })
      .catch(() => this.props.history.push("/"))
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {

      const {
        match: {
          params: { id }
        }
      } = this.props
  
      const url = `/api/v1/hoojah/${id}`
  
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error("Network response was not ok.")
        })
        .then(response => {
          const hujah = response.data
          const { agree_count, neutral_count, disagree_count } = hujah.attributes
  
          this.setState({ 
            hujah: hujah,
            hujahParentAvailable: hujah.attributes.hasOwnProperty("parent"),
            hujahChildrenAvailable: hujah.attributes.hasOwnProperty("children"),
            totalVoteCount: agree_count + neutral_count + disagree_count
          })
        })
        .catch(() => this.props.history.push("/"))
    }
  }

  handleVoteAgree() {
    if(this.userNotLoggedIn()) {
      return this.redirectToLogin()
    }
    const newHujahState = Object.assign({}, this.state.hujah)
    var addToTotalVoteCount = 0
    if(newHujahState.attributes.current_user_vote === "agree") {
      return
    } else {
      newHujahState.attributes.agree_count = newHujahState.attributes.agree_count + 1
      if(newHujahState.attributes.current_user_vote === "neutral") {
        newHujahState.attributes.neutral_count = newHujahState.attributes.neutral_count - 1
      } else if(newHujahState.attributes.current_user_vote === "disagree") {
        newHujahState.attributes.disagree_count = newHujahState.attributes.disagree_count - 1
      }
      if(newHujahState.attributes.current_user_vote === null) {
        // if user has not voted previously
        addToTotalVoteCount = 1
      }
      newHujahState.attributes.current_user_vote = "agree"
    }
    this.setState((prevState, props) => {
      return {
        hujah: newHujahState,
        totalVoteCount: prevState.totalVoteCount + addToTotalVoteCount,
        showAddHujahButton: true
      }
    })
    this.updateVote(1)
  }

  handleVoteNeutral() {
    if(this.userNotLoggedIn()) {
      return this.redirectToLogin()
    }
    const newHujahState = Object.assign({}, this.state.hujah)
    var addToTotalVoteCount = 0
    if(newHujahState.attributes.current_user_vote === "neutral") {
      return
    } else {
      newHujahState.attributes.neutral_count = newHujahState.attributes.neutral_count + 1
      if(newHujahState.attributes.current_user_vote === "agree") {
        newHujahState.attributes.agree_count = newHujahState.attributes.agree_count - 1
      } else if(newHujahState.attributes.current_user_vote === "disagree") {
        newHujahState.attributes.disagree_count = newHujahState.attributes.disagree_count - 1
      }
      if(newHujahState.attributes.current_user_vote === null) {
        addToTotalVoteCount = 1
      }
      newHujahState.attributes.current_user_vote = "neutral"
    }
    this.setState((prevState, props) => {
      return {
        hujah: newHujahState,
        totalVoteCount: prevState.totalVoteCount + addToTotalVoteCount,
        showAddHujahButton: true
      }
    })
    this.updateVote(2)
  }

  handleVoteDisagree() {
    if(this.userNotLoggedIn()) {
      return this.redirectToLogin()
    }
    const newHujahState = Object.assign({}, this.state.hujah)
    var addToTotalVoteCount = 0
    if(newHujahState.attributes.current_user_vote === "disagree") {
      return
    } else {
      newHujahState.attributes.disagree_count = newHujahState.attributes.disagree_count + 1
      if(newHujahState.attributes.current_user_vote === "agree") {
        newHujahState.attributes.agree_count = newHujahState.attributes.agree_count - 1
      } else if(newHujahState.attributes.current_user_vote === "neutral") {
        newHujahState.attributes.neutral_count = newHujahState.attributes.neutral_count - 1
      }
      if(newHujahState.attributes.current_user_vote === null) {
        addToTotalVoteCount = 1
      }
      newHujahState.attributes.current_user_vote = "disagree"
    }
    this.setState((prevState, props) => {
      return {
        hujah: newHujahState,
        totalVoteCount: prevState.totalVoteCount + addToTotalVoteCount,
        showAddHujahButton: true
      }
    })
    this.updateVote(3)
  }

  handleFilterClick(filter) {
    const { hujahResponseFilter } = this.state

    if (filter === hujahResponseFilter) {
      return;
    }

    this.setState({
      hujahResponseFilter: filter
    })
  }
  
  redirectToLogin() {
    this.props.history.push('/login')
  }

  userIsLoggedIn() {
    return this.props.loggedInStatus
  }

  userNotLoggedIn() {
    return !this.props.loggedInStatus
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

  deleteHujah() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/hoojah/destroy/${id}`
    const token = document.querySelector('meta[name="csrf-token"]').content

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(() => this.props.history.push("/"))
      .catch(error => console.log(error.message))
  }

  filterChildren(hujah, index) {
    const { hujahResponseFilter } = this.state
    if(hujahResponseFilter === "all") {
      return <HujahCardSmall key={index} hujah={hujah} />
    } else if(hujahResponseFilter === "agree" && hujah.attributes.vote === 1) {
      return <HujahCardSmall key={index} hujah={hujah} />
    } else if(hujahResponseFilter === "neutral" && hujah.attributes.vote === 2) {
      return <HujahCardSmall key={index} hujah={hujah} />
    } else if(hujahResponseFilter === "disagree" && hujah.attributes.vote === 3) {
      return <HujahCardSmall key={index} hujah={hujah} />
    }
  }

  selectedFilterClass(selectedResponse) {
    return`btn btn-${selectedResponse} btn-icon-16 fill-white`
  }

  render() {
    if($.isEmptyObject(this.state.hujah)) {
      return (
        <LoadingAnimation />
      )
    }
   
    const { hujah, hujahParentAvailable, hujahResponseFilter } = this.state
    const { children, current_user_vote, agree_count, neutral_count, disagree_count, body, children_count, user } = hujah.attributes

    const hujahChildrenAvailable = !!this.state.hujah.attributes && Array.isArray(hujah.attributes.children)

    var displayChildren = null
    if(hujahChildrenAvailable) {
      displayChildren = children.map((hujah, index) => (
        this.filterChildren(hujah, index)
      ))
    } else {
      displayChildren = (
        <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-light-grey fill-light-grey pt-0">
          <HujahIcon />
          <span className="ml-1">No response yet</span>
        </div>
      )
    }

    const displayAddHujahButton = (
      <div className="card-body pt-0 text-center">
        <ButtonAddHujah hujahParent={hujah} user={user} vote={current_user_vote} />
      </div>
    )
    
    const displayDeleteHujahButton = (
      <button className="dropdown-item" type="button" onClick={this.deleteHujah}>Delete hoojah</button>
    )

    const totalVoteCount = agree_count + neutral_count + disagree_count

    return (
      <div className="container">
        <pre>
    <code>{JSON.stringify(this.state, null, 2)}</code>
        </pre>
        <div className="row justify-content-center">
          <Navbar {...this.props} handleLogout={this.props.handleLogout} />
          <nav className="navbar bg-transparent pt-0">
            <div className="container px-0 d-flex justify-content-between">
              <ButtonBack />
              <div className="dropdown">
                <button className="btn btn-icon-24 fill-primary" type="button" id="moreAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <MoreActionsIcon />
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="moreAction">
                  {this.userIsLoggedIn() && user.id === this.props.currentUser.id ? displayDeleteHujahButton : null}
                  <button className="dropdown-item disabled" type="button">Flag hoojah</button>
                </div>
              </div>
            </div>
          </nav>
          <div className="col-12 col-lg-6 col-md-8 sm-fluid mb-2">
            <div className="card border-0 rounded-0">
              <HujahCardHeader hujah={hujah} hujahParentAvailable={hujahParentAvailable} />
              <div className="card-body pb-1 hujah-body fill-agree btn-icon-14">
                <h3 className="card-title text-black text-regular">{body}</h3>
              </div>
              <div className="card-body py-0">
                <VotingSummary
                  currentUserVote={current_user_vote}
                  agreeCount={agree_count}
                  neutralCount={neutral_count}
                  disagreeCount={disagree_count}
                  totalVoteCount={totalVoteCount}
                  handleVoteAgree={() => this.handleVoteAgree()}
                  handleVoteDisagree={() => this.handleVoteDisagree()}
                  handleVoteNeutral={() => this.handleVoteNeutral()}
                />
              </div>
              <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-light-grey fill-light-grey pt-0">
                <VotesIcon />
                <span className="ml-1">{totalVoteCount}</span>
                <span className="mx-2">·</span>
                <HujahIcon />
                <span className="ml-1">{children_count}</span>
              </div>
              {current_user_vote === null ? null : displayAddHujahButton}
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 col-md-8 sm-fluid mb-2">
            <div className="card border-0 rounded-0 pb-3">
              <div className="card-body">
                <div className="shadow btn-group btn-group-lg d-flex" role="group">
                  <button type="button" className={hujahResponseFilter === "all" ? this.selectedFilterClass("primary") : "btn btn-outline-light btn-icon-16 fill-primary text-primary"} onClick={() => this.handleFilterClick("all")}>All <HujahIcon /></button>
                  <button type="button" className={hujahResponseFilter === "agree" ? this.selectedFilterClass("agree") : "btn btn-outline-light btn-icon-16 fill-agree"} onClick={() => this.handleFilterClick("agree")}><AgreeIcon /></button>
                  <button type="button" className={hujahResponseFilter === "neutral" ? this.selectedFilterClass("neutral") : "btn btn-outline-light btn-icon-16 fill-neutral"} onClick={() => this.handleFilterClick("neutral")}><NeutralIcon /></button>
                  <button type="button" className={hujahResponseFilter === "disagree" ? this.selectedFilterClass("disagree") : "btn btn-outline-light btn-icon-16 fill-disagree"} onClick={() => this.handleFilterClick("disagree")}><DisagreeIcon /></button>
                </div>
              </div>
              {displayChildren}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const Button = ({ type = 'button', className, variant, ...props }) => {
  return <button type={type} className={`btn ${className}`} {...props} />
}

function updateVoteApi({
  vote,
  hujahId,
  userId
}) {
  const url = "/api/v1/votes/create"

  const body = {
    vote: vote,
    hujah_id: hujahId,
    user_id: userId
  }

  const token = document.querySelector('meta[name="csrf-token"]').content
  return fetch(url, {
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

function calculatePercentage(voteCount, totalVoteCount) {
  const percentage = voteCount * 100 / totalVoteCount
  if(percentage > 0) {
    return percentage
  } else {
    return 0
  }
}

const VotingSummary = ({ currentUserVote, agreeCount, neutralCount, disagreeCount, totalVoteCount, handleVoteAgree, handleVoteDisagree, handleVoteNeutral }) => {
  const themeValue = React.useContext(ThemeContext);

  console.log({ themeValue })

  return (
    <div className="d-flex flex-column justify-content-around">
      <button onClick={themeValue[1]}>toggle</button>
    <div className="vote-show mb-3 d-flex align-items-center">
      <button className={`shadow btn btn-outline-agree btn-lg btn-circle btn-icon-16 fill-agree ${currentUserVote === "agree" ? "voted" : null}`} onClick={handleVoteAgree}><AgreeIcon /></button>
      <div className="vote bg-agree mr-2" style={{ width: `${calculatePercentage(agreeCount, totalVoteCount)}%` }}></div>
      <small className="vote-text text-agree ml-auto">{Math.round(calculatePercentage(agreeCount, totalVoteCount))}%</small>
    </div>
    <div className="vote-show mb-3 d-flex align-items-center">
      <button className={`shadow btn btn-outline-neutral btn-lg btn-circle btn-icon-16 fill-neutral neutral ${currentUserVote === "neutral" ? "voted" : null}`} onClick={handleVoteNeutral}><NeutralIcon /></button>
      <div className="vote bg-neutral mr-2" style={{ width: `${calculatePercentage(neutralCount, totalVoteCount)}%` }}></div>
      <small className="vote-text text-neutral ml-auto">{Math.round(calculatePercentage(neutralCount, totalVoteCount))}%</small>
    </div>
    <div className="vote-show mb-3 d-flex align-items-center">
      <button className={`shadow btn btn-outline-disagree btn-lg btn-circle btn-icon-16 fill-disagree ${currentUserVote === "disagree" ? "voted" : null}`} onClick={handleVoteDisagree}><DisagreeIcon /></button>
      <div className="vote bg-disagree mr-2" style={{ width: `${calculatePercentage(disagreeCount, totalVoteCount)}%` }}></div>
      <small className="vote-text text-disagree ml-auto">{Math.round(calculatePercentage(disagreeCount, totalVoteCount))}%</small>
    </div>
  </div>
  )
}

export default Hujah
