import React from 'react'
import { Link } from 'react-router-dom'

class HujahParentCard extends React.Component {
  render() {
    const hujah = this.props.hujah
    const { user, body } = hujah.attributes

    return(
      <Link to={`/hoojah/${hujah.id}`} className="no-underscore">
        <div className="shadow card-body border-bottom border-light-grey px-3 py-1 d-flex align-items-center mb-0">
          <div className="media pt-1">
            <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/kjpulst4m0yei0cnsbbo.png" className="rounded-circle mr-2 avatar-small" />
            <div className="media-body">
              <div className="d-flex flex-column">
                <small className="text-grey">
                  Response to <span className="text-primary">{user.attributes.full_name}</span>'s hoojah
                </small>
                <div className="mb-0 text-grey text-14 text-truncate d-inline-block" style={{ width: "70vw" }}>{body}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default HujahParentCard
