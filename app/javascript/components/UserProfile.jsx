import React from 'react'
import $ from 'jquery'
import Navbar from './Layouts/navbar'
import LoadingAnimation from './Layouts/loading_animation'
import GlobeIcon from './Icons/globe'
import MapPinIcon from './Icons/map_pin'
import VotesIcon from './Icons/votes'
import HujahIcon from './Icons/hujah'
import HujahCardSmall from './Hujah/card_small'

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

    return (
      <div className="">
        <Navbar {...this.props} handleLogout={this.props.handleLogout} />
        <div id="navbar-bg"></div>
        <main className="container">
          <div 
            className="row bg-primary text-white py-4" 
            style={{ 
              backgroundImage: "url('https://source.unsplash.com/random/800x600')",
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundBlendMode: 'multiply'
            }}>
            <div className="col-12 d-flex flex-column align-items-center">
              <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_100,w_100/kjpulst4m0yei0cnsbbo.png" className="rounded-circle mb-3" />
              <h5 className="mb-0">{full_name}</h5>
              <div className="mb-3">@{username}</div>
              <div className="mb-3">{headline}</div>
              {location === null ? null : displayLocation}
              {link === null ? null : displayLink}
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
      </div>
    )
  }

}

export default UserProfile