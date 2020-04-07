import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Layouts/navbar'
import MoreActionsIcon from './Icons/more_actions'
import ButtonBack from './Layouts/button_back'
import AgreeIcon from './Icons/agree'
import NeutralIcon from './Icons/neutral'
import DisagreeIcon from './Icons/disagree'
import ViewsIcon from './Icons/views'
import VotesIcon from './Icons/votes'
import HujahIcon from './Icons/hujah'
import HujahCardHeader from './Hujah/card_header'
import HujahCardSmall from './Hujah/card_small'

class Hujah extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      hujah: { 
        id: null,
        body: "",
        agree_count: 33,
        neutral_count: 34,
        disagree_count: 33
      },
      children: [],
      hujahParent: {
        id: null,
        body: "",
        username: "",
        full_name: ""
      },
      user: {
        id: null,
        username: "",
        full_name: ""
      }
    }
    this.deleteHujah = this.deleteHujah.bind(this)
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
        const data = response.data
        this.setState({ 
          hujah: {
            id: data.id,
            body: data.attributes.body,
            agree_count: data.attributes.agree_count,
            neutral_count: data.attributes.neutral_count,
            disagree_count: data.attributes.disagree_count,
          },
          user: data.attributes.user
        })
        if(data.attributes.hasOwnProperty("parent")) {
          this.setState({ hujahParent: data.attributes.parent })
        } else {
          this.setState({ hujahParent: {} })
        }
        if(data.attributes.hasOwnProperty("children")) {
          this.setState({ children: data.attributes.children })
        } else {
          this.setState({ children: [] })
        }
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
          const data = response.data
          this.setState({ 
            hujah: {
              id: data.id,
              body: data.attributes.body,
              agree_count: data.attributes.agree_count,
              neutral_count: data.attributes.neutral_count,
              disagree_count: data.attributes.disagree_count,
            },
            user: data.attributes.user
          })
          if(data.attributes.hasOwnProperty("parent")) {
            this.setState({ hujahParent: data.attributes.parent })
          } else {
            this.setState({ hujahParent: {} })
          }
          if(data.attributes.hasOwnProperty("children")) {
            this.setState({ children: data.attributes.children })
          } else {
            this.setState({ children: [] })
          }
        })
        .catch(() => this.props.history.push("/"))
    }
  }

  calculatePercentage(voteCount, totalVoteCount) {
    const percentage = voteCount * 100 / totalVoteCount
    return percentage
  }

  deleteHujah() {
    const {
      match: {
        params: { id }
      }
    } = this.props
    const url = `/api/v1/destroy/${id}`
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

  render() {
    const { hujah, children, hujahParent, user } = this.state

    const displayChildren = children.map((hujah, index) => (
      <HujahCardSmall key={index} hujah={hujah} />
    ))

    const noChildren = (
      <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-light-grey fill-light-grey pt-0">
        <HujahIcon />
        <span className="ml-1">No response yet</span>
      </div>
    )

    const totalVoteCount = hujah.agree_count + hujah.neutral_count + hujah.disagree_count

    return (
      <div className="container">
        <div className="row">
          <Navbar {...this.props} handleLogout={this.props.handleLogout} />
          <nav className="navbar bg-transparent pt-0">
            <div className="container px-0 d-flex justify-content-between">
              <ButtonBack />
              <div className="dropdown">
                <button className="btn btn-icon-24 fill-primary" type="button" id="moreAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <MoreActionsIcon />
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="moreAction">
                  <button className="dropdown-item" type="button" onClick={this.deleteHujah}>Delete hoojah</button>
                  <button className="dropdown-item" type="button">Flag hoojah</button>
                </div>
              </div>
            </div>
          </nav>
          <div className="col-12 sm-fluid mb-2">
            <div className="card border-0 rounded-0">
              <HujahCardHeader 
                hujah={hujah} 
                user={user} 
                hujahParent={hujahParent.id == null ? null : hujahParent} />
              <div className="card-body pb-1 hujah-body fill-agree btn-icon-14">
                <h3 className="card-title text-black text-regular">{hujah.body}</h3>
              </div>
              <div className="card-body py-0">
                <div className="d-flex flex-column justify-content-around">
                  <div className="vote-show mb-3 d-flex align-items-center">
                    <a role="button" className="shadow btn btn-outline-warning btn-lg btn-circle btn-icon-16 fill-agree"><AgreeIcon /></a>
                    <div className="vote bg-agree" style={{ width: `${this.calculatePercentage(hujah.agree_count, totalVoteCount)}%` }}></div>
                    <small className="vote-text text-agree ml-auto">{Math.round(this.calculatePercentage(hujah.agree_count, totalVoteCount))}%</small>
                  </div>
                  <div className="vote-show mb-3 d-flex align-items-center">
                    <a role="button" className="shadow btn btn-outline-danger btn-lg btn-circle btn-icon-16 fill-neutral neutral"><NeutralIcon /></a>
                    <div className="vote bg-neutral" style={{ width: `${this.calculatePercentage(hujah.neutral_count, totalVoteCount)}%` }}></div>
                    <small className="vote-text text-neutral ml-auto">{Math.round(this.calculatePercentage(hujah.neutral_count, totalVoteCount))}%</small>
                  </div>
                  <div className="vote-show mb-3 d-flex align-items-center">
                    <a role="button" className="shadow btn btn-outline-info btn-lg btn-circle btn-icon-16 fill-disagree"><DisagreeIcon /></a>
                    <div className="vote bg-disagree" style={{ width: `${this.calculatePercentage(hujah.disagree_count, totalVoteCount)}%` }}></div>
                    <small className="vote-text text-disagree ml-auto">{Math.round(this.calculatePercentage(hujah.disagree_count, totalVoteCount))}%</small>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-light-grey fill-light-grey pt-0">
                <ViewsIcon />
                <span className="ml-1">348</span>
                <span className="mx-2">·</span>
                <VotesIcon />
                <span className="ml-1">{totalVoteCount}</span>
                <span className="mx-2">·</span>
                <HujahIcon />
                <span className="ml-1">55</span>
              </div>
              <div className="card-body pt-0 text-center">
                <Link to={{
                    pathname: '/hoojah/new',
                    state: {
                      hujah: hujah,
                      user: user
                    }
                  }} className="shadow btn btn-lg btn-outline-warning btn-rounded btn-icon-16 fill-agree">
                  <HujahIcon /> Add hoojah
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 sm-fluid mb-2">
            <div className="card border-0 rounded-0">
              <div className="card-body">
                <div className="shadow btn-group btn-group-lg d-flex" role="group">
                  <button type="button" className="btn btn-primary btn-icon-16 fill-white">
                    All <HujahIcon />
                  </button>
                  <button type="button" className="btn btn-outline-light btn-icon-16 fill-agree"><AgreeIcon /></button>
                  <button type="button" className="btn btn-outline-light btn-icon-16 fill-neutral"><NeutralIcon /></button>
                  <button type="button" className="btn btn-outline-light btn-icon-16 fill-disagree"><DisagreeIcon /></button>
                </div>
              </div>
              {children.length > 0 ? displayChildren : noChildren}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Hujah
