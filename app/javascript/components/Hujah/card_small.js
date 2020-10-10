import React from "react"
import { Link } from 'react-router-dom'
import AgreeIcon from '../Icons/agree'
import NeutralIcon from '../Icons/neutral'
import DisagreeIcon from '../Icons/disagree'

class HujahCardSmall extends React.Component {

  parseVote(vote) {
    if(vote == 1) {
      return "agree"
    } else if(vote == 2) {
      return "neutral"
    } else if(vote == 3) {
      return "disagree"
    } else {
      return "primary"
    }
  }

  render() {
    const hujah = this.props.hujah
    console.log(hujah)
    const { body, vote, agree_count, neutral_count, disagree_count, user, slug } = hujah.attributes
    const { full_name, username, photo } = user.attributes

    return(
      <Link to={`/hoojah/${slug}`} className="no-underscore">
        <div className={`shadow card-body border-left-8 border-${this.parseVote(vote)} border-bottom-0 py-0 pl-0 pr-2 d-flex align-items-center mb-1`}>
          <div className="media py-1">
            <img src={photo} className="rounded-circle mx-2 avatar-small" />
            <div className="media-body">
              <div className="d-flex flex-column">
                <div>
                  <span className="my-0 mr-1 text-primary">{full_name}</span>
                  <span className="handle">
                    <small className="text-muted">{`@${username}`}</small>
                  </span>
                </div>
                <p className="mb-0 text-black" style={{ wordBreak: "break-word", whiteSpace: "normal" }} dangerouslySetInnerHTML={{ __html: body }}></p>
                <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-light-grey fill-light-grey p-0">
                  <AgreeIcon />
                  <span className="ml-1">{agree_count}</span>
                  <span className="mx-2">·</span>
                  <NeutralIcon />
                  <span className="ml-1">{neutral_count}</span>
                  <span className="mx-2">·</span>
                  <DisagreeIcon />
                  <span className="ml-1">{disagree_count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default HujahCardSmall
