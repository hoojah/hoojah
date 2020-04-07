import React, { Fragment } from "react"
import { Link } from 'react-router-dom'
import ShareIcon from '../Icons/share'
import HujahCardParent from './card_parent'

class HujahCardHeader extends React.Component {
  render() {
    const { hujahParent, user } = this.props
    console.log("############### this.props.hujahParent in card_header.js")
    console.log(this.props.hujahParent)
    console.log("############### this.props.hujahParent == null in card_header.js")
    console.log(this.props.hujahParent == null)

    return(
      <Fragment>
        { hujahParent == null ? null : <HujahCardParent hujah={hujahParent} /> }

        <div className="card-header border-bottom-0 pb-0 d-flex justify-content-between align-items-center">
          <div className="media">
            <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mr-3 avatar" />
            <div className="media-body">
              <div className="d-flex flex-column">
                <Link to={"/"} className="mt-0 mb-0">{user.full_name}</Link>
                <a className="no-underscore handle">
                  <small className="text-muted">{`@${user.username}`}</small>
                </a>
              </div>
            </div>
          </div>
          <Link to="/hujah" className="btn-icon-16 fill-light-grey">
            <ShareIcon />
          </Link>
        </div>
      </Fragment>
    )
  }
}

export default HujahCardHeader
