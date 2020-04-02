import React from "react"
import { Link } from 'react-router-dom'
import AgreeIcon from '../Icons/agree'
import NeutralIcon from '../Icons/neutral'
import DisagreeIcon from '../Icons/disagree'
import HujahCardHeader from './card_header'

class HujahCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hujah: { 
        body: "",
        agree_count: 33,
        neutral_count: 34,
        disagree_count: 33
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
    const hujah = this.state.hujah
    return(
      <div className="col-12 sm-fluid mb-2">
        <div className="card border-0 rounded-0">
          <HujahCardHeader hujah={hujah} />
          <div className="card-body pb-0">
            <Link to={`/hoojah/${hujah.id}`} className="">
              <h5 className="card-title text-black text-regular">{hujah.body}</h5>
            </Link>
          </div>
          <div className="card-body pt-0">
            <div className="d-flex justify-content-around">
              <a role="button" className="btn btn-outline-warning btn-lg btn-circle btn-icon-16 fill-agree"><AgreeIcon /></a>
              <a role="button" className="btn btn-outline-danger btn-lg btn-circle btn-icon-16 fill-neutral neutral"><NeutralIcon /></a>
              <a role="button" className="btn btn-outline-info btn-lg btn-circle btn-icon-16 fill-disagree"><DisagreeIcon /></a>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="d-flex justify-content-around vote-bar">
              <div className="vote bg-agree" style={{ width: this.calculatePercentage(hujah.agree_count) }}></div>
              <div className="vote bg-neutral" style={{ width: this.calculatePercentage(hujah.neutral_count) }}></div>
              <div className="vote bg-disagree" style={{ width: this.calculatePercentage(hujah.disagree_count) }}></div>
            </div>
          </div>
          <div className="card-footer text-muted d-flex justify-content-between">
            <small>Tom posted a hoojah</small>
            <small>2h</small>
          </div>
        </div>
      </div>
    )
  }
}

export default HujahCard
