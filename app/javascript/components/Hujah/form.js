import React, { Fragment } from "react"
import { Link } from 'react-router-dom'
import AgreeIcon from '../Icons/agree'
import MoreActionsIcon from '../Icons/more_actions'
import BackIcon from '../Icons/back'
import HujahIcon from '../Icons/hujah'

class HujahForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <nav className="navbar fixed-top navbar-light">
            <div className="container px-0 d-flex justify-content-between">
              <Link to="/" className="btn btn-icon-24 fill-primary">
                <BackIcon />
              </Link>
              <Link to="/hoojah/new" className="shadow btn btn-outline-warning btn-rounded btn-icon-16 fill-agree">
                <HujahIcon /> Post hoojah
              </Link>
            </div>
          </nav>
          <div className="col-12 mb-2">
            <small>You <span className="text-agree btn-icon-14 fill-agree"><AgreeIcon /> agreed</span> to User Name's claim:</small>  
          </div>
          <div className="col-12 mb-4 pl-2 border-left-8 border-warning">
            <h6 className="text-regular pt-1">We should teach science & mathematics in English as early as in primary school.</h6>
          </div>
          <div className="col-12 d-flex">
            <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mr-3 avatar" />
            <textarea className="form-control new-hujah-form border-0 pl-0 bg-transparent" placeholder={"What's your hoojah?"} rows="10"></textarea>
          </div>
        </div>
      </div>
    )
  }
}

export default HujahForm
