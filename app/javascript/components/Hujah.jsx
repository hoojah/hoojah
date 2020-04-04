import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import $ from 'jquery'
import NavbarHujah from './Layouts/navbar_hujah'
import AgreeIcon from './Icons/agree'
import NeutralIcon from './Icons/neutral'
import DisagreeIcon from './Icons/disagree'
import ViewsIcon from './Icons/views'
import VotesIcon from './Icons/votes'
import HujahIcon from './Icons/hujah'
import HujahCardHeader from './Hujah/card_header'
import HujahCardSmall from './Hujah/card_small'
import HujahCardParent from './Hujah/card_parent'

class Hujah extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      hujah: { 
        body: "",
        agree_count: 33,
        neutral_count: 34,
        disagree_count: 33,
      },
      hujahs: [],
      parentHujah: {}
    }
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
        this.setState({ 
          hujah: response.hujah,
          hujahs: response.hujahs,
          parentHujah: response.parentHujah
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
            return response.json();
          }
          throw new Error("Network response was not ok.")
        })
        .then(response => {
          this.setState({ 
            hujah: response.hujah,
            hujahs: response.hujahs,
            parentHujah: response.parentHujah
          })
        })
        .catch(() => this.props.history.push("/"))
    }
  }

  calculatePercentage(voteCount, totalVoteCount) {
    const percentage = voteCount * 100 / totalVoteCount
    return percentage
  }

  render() {
    const { hujah, hujahs, parentHujah } = this.state;

    const allHujahs = hujahs.map((hujah, index) => (
      <Fragment>
        <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-light-grey fill-light-grey pt-0">
          <HujahIcon />
          <span className="ml-1">55</span>
        </div>
        <HujahCardSmall key={index} hujah={hujah} />
      </Fragment>
    ));

    const noHujah = (
      <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-light-grey fill-light-grey pt-0">
        <HujahIcon />
        <span className="ml-1">No hoojah yet</span>
      </div>
    );

    const totalVoteCount = hujah.agree_count + hujah.neutral_count + hujah.disagree_count

console.log(":: ")
console.log(":: ")
console.log(":: ")
console.log(":: ")
console.log(":: ")
console.log(":: $.isEmptyObject(parentHujah) ::")
console.log($.isEmptyObject(parentHujah))

    return (
      <div className="container">
        <div className="row">
          <NavbarHujah />
          <div className="col-12 sm-fluid mb-2">
            <div className="card border-0 rounded-0">
              <div className="card-body pb-1 hujah-body fill-agree btn-icon-14">
                { $.isEmptyObject(parentHujah) ? null : <HujahCardParent hujah={parentHujah} /> }
                <h3 className="card-title text-black text-regular">{hujah.body}</h3>
              </div>
            </div>
          </div>
          <div className="col-12 sm-fluid mb-2">
            <div className="card border-0 rounded-0">
              <HujahCardHeader hujah={hujah} />
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
                <Link to="/" className="shadow btn btn-lg btn-outline-warning btn-rounded btn-icon-16 fill-agree">
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
              {hujahs.length > 0 ? allHujahs : noHujah}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hujah;