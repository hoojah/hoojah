import React from "react"
import { Link } from 'react-router-dom'

class HujahParentCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hujah: this.props.hujah,
    };
  }

  render() {
    const hujah = this.state.hujah

    return(
      <Link to={`/hoojah/${hujah.id}`} className="no-underscore">
        <div className="shadow card-body border-bottom border-light-grey px-3 py-1 d-flex align-items-center mb-0">
          <div className="media pt-1">
            <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mr-2 avatar-small" />
            <div className="media-body">
              <div className="d-flex flex-column">
                <small className="text-grey">
                  Response to <span className="text-primary">{hujah.full_name}</span>'s hoojah
                </small>
                <div className="mb-0 text-grey text-14 text-truncate d-inline-block" style={{ width: "70vw" }}>{hujah.body}</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default HujahParentCard
