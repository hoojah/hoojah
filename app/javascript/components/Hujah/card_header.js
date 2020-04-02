import React from "react"
import { Link } from 'react-router-dom'
import ShareIcon from '../Icons/share'

class HujahCardHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hujah: this.props.hujah,
    };
  }

  render() {
    const hujah = this.state.hujah
    return(
      <div className="card-header bg-transparent border-bottom-0 pb-0 d-flex justify-content-between align-items-center">
        <div className="media">
          <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mr-3 avatar" />
          <div className="media-body">
            <div className="d-flex flex-column">
              <Link to={`/users/${hujah.id}`} className="mt-0 mb-0">User Name</Link>
              <a className="no-underscore handle">
                <small className="text-muted">@user_handle</small>
              </a>
            </div>
          </div>
        </div>
        <Link to="/hujah" className="btn-icon-16 fill-light-grey">
          <ShareIcon />
        </Link>
      </div>
    )
  }
}

export default HujahCardHeader
