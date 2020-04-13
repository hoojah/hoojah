import React from 'react'
import $ from 'jquery'
import Navbar from './Layouts/navbar'
import LoadingAnimation from './Layouts/loading_animation'
import GlobeIcon from './Icons/globe'
import MapPinIcon from './Icons/map_pin'
import VotesIcon from './Icons/votes'
import HujahIcon from './Icons/hujah'
import EditIcon from './Icons/edit'
import HujahCardSmall from './Hujah/card_small'
import UserForm from './User/form'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      userHasHujahs: false
    }
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props

    const url = `/api/v1/users/${id}`

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => {
        const user = response.data
        this.setState({ 
          user: user,
          userHasHujahs: user.attributes.hasOwnProperty("hujahs"),
        })
      })
      .catch(() => this.props.history.push("/"))
  }

  updateUserState = (user) => {
    this.setState({ 
      user: user
    })
  }

  render() {
    if($.isEmptyObject(this.state.user)){
      return (
        <LoadingAnimation />
      )
    }

    const { user, userHasHujahs } = this.state
    const { username, full_name, location, headline, link, hujah_count, vote_count, hujahs } = user.attributes

    var displayChildren = null
    if(userHasHujahs) {
      displayChildren = hujahs.map((hujah, index) => (
        <HujahCardSmall key={index} hujah={hujah} />
      ))
    } else {
      displayChildren = (
        <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-light-grey fill-light-grey pt-0">
          <HujahIcon />
          <span className="ml-1">No response yet</span>
        </div>
      )
    }

    const displayLocation = (
      <div className="text-14 mb-1 btn-icon-14 fill-white">
        <MapPinIcon /> {location}
      </div>
    )

    const displayLink = (
      <div className="text-14 mb-1 btn-icon-14 fill-white">
        <GlobeIcon /> {link}
      </div>
    )

    const displayEditButton = (
      <button type="button" className="position-absolute btn btn-link btn-icon-14 fill-white p-0"
        style={{ top: 0, right: 20 }} data-toggle="modal" data-target="#userEditModal">
        <EditIcon className="" />
      </button>
    )
    
    return (
      <div className="">
        <Navbar {...this.props} handleLogout={this.props.handleLogout} />
        <div id="navbar-bg"></div>
        <main className="container">
          <div className="row bg-primary text-white py-4"> 
            <div className="col-12 d-flex flex-column align-items-center position-relative">
              {this.props.loggedInStatus && this.props.currentUser.id == user.id ? displayEditButton : null}
              <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_100,w_100/kjpulst4m0yei0cnsbbo.png" className="rounded-circle mb-3" />
              <h5 className="mb-0">{full_name}</h5>
              <div className="mb-3">@{username}</div>
              <div className="mb-3">{headline}</div>
              {location === "" ? null : displayLocation}
              {link === "" ? null : displayLink}
              <div className="text-14 mb-1 btn-icon-14 fill-white">
                <VotesIcon />
                <span className="ml-1">{vote_count}</span>
                <span className="mx-2">·</span>
                <HujahIcon />
                <span className="ml-1">{hujah_count}</span></div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12 d-flex flex-column px-0">
              {displayChildren}
            </div>
          </div>
        </main>
        <UserForm {...this.props} user={user} updateUserState={this.updateUserState} />
      </div>
    )
  }
}

export default UserProfile
