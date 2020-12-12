import React from 'react'
import { Link } from 'react-router-dom'

class Pinned extends React.Component {

  render() {

    return(
      <div className="shadow card border-0 rounded-0 mb-2">
        <div className="card-header border-bottom-0 pb-0 d-flex justify-content-between align-items-center">
          Create a Hoojah account to secure your @username now!
        </div>
        <div className="card-body pb-0">
          <Link to={'/start/signup'}>
            <h5 className="card-title">Click here to SIGN UP!</h5>
          </Link>
        </div>
      </div>
    )
  }
}

export default Pinned
