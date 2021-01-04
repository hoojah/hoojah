import React from 'react'
import { Link } from 'react-router-dom'

class Pinned extends React.Component {

  render() {

    return(
      <div className="shadow card border-0 rounded-0 mb-2">
        <div className="card-body text-center bg-info text-white">
          <h5 className="card-title">Create a Hoojah account<br />to secure your @username now!</h5>
          <Link to={"/start/signup"} className="btn btn-warning">Click here to sign up!</Link>
        </div>
      </div>
    )
  }
}

export default Pinned
