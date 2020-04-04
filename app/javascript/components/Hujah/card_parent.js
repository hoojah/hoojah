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
      <div className="shadow card-body border-bottom-0 p-0 d-flex align-items-center mb-1">
        <div className="media py-1">
          <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mx-2 avatar-small" />
          <div className="media-body">
            <div className="d-flex flex-column">
              <small className="text-grey">
                Response to <Link to={`/users/${hujah.id}`} className="m-0">User Name</Link>'s hoojah
              </small>
              <Link to={`/hoojah/${hujah.id}`} className="">
                <p className="mb-0 text-grey text-14 text-truncate d-inline-block" style={{ width: "70vw" }}>{hujah.body}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HujahParentCard
