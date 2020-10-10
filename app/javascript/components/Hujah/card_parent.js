import React from 'react'
import { Link } from 'react-router-dom'

class HujahParentCard extends React.Component {
  render() {
    const hujah = this.props.hujah
    const { user, body, slug } = hujah.attributes
    const { full_name, photo } = user.attributes

    return(
      <Link to={`/hoojah/${slug}`} className="no-underscore">
        <div id="parent-card-container" className="shadow card-body border-bottom border-light-grey px-3 py-1 d-flex align-items-center mb-0">
          <div className="media pt-1">
            <img src={photo} className="rounded-circle mr-2 avatar-small" />
            <div className="media-body">
              <div className="d-flex flex-column">
                <small className="text-grey">
                  Response to <span className="text-primary">{full_name}</span>'s hoojah
                </small>
                <div className="mb-0 text-grey text-14 text-truncate d-block d-sm-none" style={{ maxWidth: '270px' }} dangerouslySetInnerHTML={{ __html: body }}></div>
                <div className="mb-0 text-grey text-14 text-truncate d-none d-sm-block d-md-none" style={{ maxWidth: '310px' }} dangerouslySetInnerHTML={{ __html: body }}></div>
                <div className="mb-0 text-grey text-14 text-truncate d-none d-md-block" style={{ maxWidth: '350px' }} dangerouslySetInnerHTML={{ __html: body }}></div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default HujahParentCard
