import React from 'react'
import { Link } from 'react-router-dom'
import AgreeIcon from '../Icons/agree'
import NeutralIcon from '../Icons/neutral'
import DisagreeIcon from '../Icons/disagree'
import ViewsIcon from '../Icons/views'
import VotesIcon from '../Icons/votes'
import HujahIcon from '../Icons/hujah'
import HujahCardHeader from './card_header'
import HujahCardParent from './card_parent'

class HujahCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hujah: {
        id: null,
        type: "",
        attributes: {
          body: "",
          agree_count: null,
          neutral_count: null,
          disagree_count: null,
          parent: {
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
      },
      totalVoteCount: 100
    };
  }
  
  // TODO: animate vote bar 
  componentDidMount() {
    this.setState({ 
      hujah: this.props.hujah,
      totalVoteCount: this.props.totalVoteCount
     })
  }

  calculatePercentage(voteCount) {
    const percentage = voteCount * 100 / this.state.totalVoteCount
    return `${percentage}%`
  }
  render() {
    const { hujah, totalVoteCount } = this.state

    return(
      <div className="col-12 sm-fluid mb-3">
        <div className="shadow card border-0 rounded-0">
          <HujahCardHeader hujah={hujah} hujahParent={ this.props.hujahParent == null ? null : this.props.hujahParent } user={this.props.user} />
          <div className="card-body pb-0">
            <Link to={`/hoojah/${hujah.id}`}>
              <h5 className="card-title text-black text-regular">{hujah.attributes.body}</h5>
            </Link>
          </div>
          <div className="card-body pt-0">
            <div className="d-flex justify-content-around">
              <a role="button" className="shadow btn btn-outline-warning btn-lg btn-circle btn-icon-16 fill-agree"><AgreeIcon /></a>
              <a role="button" className="shadow btn btn-outline-danger btn-lg btn-circle btn-icon-16 fill-neutral neutral"><NeutralIcon /></a>
              <a role="button" className="shadow btn btn-outline-info btn-lg btn-circle btn-icon-16 fill-disagree"><DisagreeIcon /></a>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="d-flex justify-content-around vote-bar">
              <div className="vote bg-agree" style={{ width: this.calculatePercentage(hujah.attributes.agree_count) }}></div>
              <div className="vote bg-neutral" style={{ width: this.calculatePercentage(hujah.attributes.neutral_count) }}></div>
              <div className="vote bg-disagree" style={{ width: this.calculatePercentage(hujah.attributes.disagree_count) }}></div>
            </div>
          </div>
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
