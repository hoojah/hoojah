import React from "react"
import { Link } from 'react-router-dom'

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
    const { body, full_name, username, vote } = hujah.attributes

    return(
      <Link to={`/hoojah/${hujah.id}`} className="no-underscore">
        <div className={`shadow card-body border-left-8 border-${this.parseVote(vote)} border-bottom-0 py-0 pl-0 pr-2 d-flex align-items-center mb-1`}>
          <div className="media py-1">
            <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mx-2 avatar-small" />
            <div className="media-body">
              <div className="d-flex flex-column">
                <div>
                  <span className="my-0 mr-1 text-primary">{full_name}</span>
                  <span className="handle">
                    <small className="text-muted">{`@${username}`}</small>
                  </span>
                </div>
                <p className="mb-0 text-black">{body}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default HujahCardSmall
