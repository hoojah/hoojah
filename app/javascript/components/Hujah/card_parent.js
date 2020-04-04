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

console.log(":: ")
console.log("card parent :")
console.log(hujah)
    return(
      <div className="shadow card-body border-bottom-0 p-0 d-flex align-items-center mb-2">
        <div className="media py-1">
          <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mx-2 avatar-small" />
          <div className="media-body">
            <div className="d-flex flex-column">
              <div>
                <Link to={`/users/${hujah.id}`} className="my-0 mr-1">User Name</Link>
                <a className="no-underscore handle">
                  <small className="text-muted">@user_handle</small>
                </a>
              </div>
              <Link to={`/hoojah/${hujah.id}`} className="">
                <p className="mb-0 text-black">{hujah.body}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HujahParentCard
