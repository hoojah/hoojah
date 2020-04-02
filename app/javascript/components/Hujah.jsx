import React from "react";
import { Link } from "react-router-dom";
import Loading from 'loading.svg'
import NavbarHujah from './Layouts/navbar_hujah'
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
        body: "",
        agree_count: 33,
        neutral_count: 34,
        disagree_count: 33,
      },
      hujahs: []
    }

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/hoojah/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        this.setState({ 
          hujah: response.hujah,
          hujahs: response.hujahs
        })
      })
      .catch(() => this.props.history.push("/"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  calculatePercentage(voteCount, totalVoteCount) {
    const percentage = voteCount * 100 / totalVoteCount
    return percentage
  }

  render() {
    const { hujah, hujahs } = this.state;

    const allHujahs = hujahs.map((hujah, index) => (
      <HujahCardSmall key={index} hujah={hujah} />
    ));

    const noHujah = (
      <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
        <img src={Loading} className="loading"/>
      </div>
    );

    const totalVoteCount = hujah.agree_count + hujah.neutral_count + hujah.disagree_count

    let voteResults = "No votes available"

    // if (hujah.votes.length > 0) {
    //   voteResults = hujah.votes
    //     .split(",")
    //     .map((vote, index) => (
    //       <li key={index} className="list-group-item">
    //         {vote}
    //       </li>
    //     ));
    // }

    return (
      <div className="container">
        <div className="row">
          <NavbarHujah />
          <div className="col-12 sm-fluid mb-2">
            <div className="card border-0 rounded-0">
              <HujahCardHeader hujah={hujah} />
              <div className="card-body pb-1">
                <h3 className="card-title text-black text-regular">{hujah.body}</h3>
              </div>
              <div className="card-body py-0">
                <div className="d-flex flex-column justify-content-around">
                  <div className="vote-show mb-3 d-flex align-items-center">
                    <a role="button" className="btn btn-outline-warning btn-lg btn-circle btn-icon-16 fill-agree"><AgreeIcon /></a>
                    <div className="vote bg-agree" style={{ width: `${this.calculatePercentage(hujah.agree_count, totalVoteCount)}%` }}></div>
                    <small className="vote-text text-agree ml-auto">{Math.round(this.calculatePercentage(hujah.agree_count, totalVoteCount))}%</small>
                  </div>
                  <div className="vote-show mb-3 d-flex align-items-center">
                    <a role="button" className="btn btn-outline-danger btn-lg btn-circle btn-icon-16 fill-neutral neutral"><NeutralIcon /></a>
                    <div className="vote bg-neutral" style={{ width: `${this.calculatePercentage(hujah.neutral_count, totalVoteCount)}%` }}></div>
                    <small className="vote-text text-neutral ml-auto">{Math.round(this.calculatePercentage(hujah.neutral_count, totalVoteCount))}%</small>
                  </div>
                  <div className="vote-show mb-3 d-flex align-items-center">
                    <a role="button" className="btn btn-outline-info btn-lg btn-circle btn-icon-16 fill-disagree"><DisagreeIcon /></a>
                    <div className="vote bg-disagree" style={{ width: `${this.calculatePercentage(hujah.disagree_count, totalVoteCount)}%` }}></div>
                    <small className="vote-text text-disagree ml-auto">{Math.round(this.calculatePercentage(hujah.disagree_count, totalVoteCount))}%</small>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center hoojah-numbers card-body btn-icon-14 text-light-grey fill-light-grey pt-0">
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
                <Link to="/" className="btn btn-lg btn-outline-warning btn-rounded btn-icon-16 fill-agree">
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
                <div className="btn-group btn-group-lg d-flex" role="group">
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