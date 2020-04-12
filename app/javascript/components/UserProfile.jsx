import React from 'react'
import $ from 'jquery'
import Navbar from './Layouts/navbar'
import LoadingAnimation from './Layouts/loading_animation'

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
    console.log(this.props)
    if($.isEmptyObject(this.state.user)){
      return (
        <LoadingAnimation />
      )
    }

    const { user, userHasHujahs } = this.state
    const { username, full_name, location, headline, link, hujah_count, hujahs } = user.attributes

    var displayChildren = null
    if(userHasHujahs) {
      displayChildren = hujahs.map((hujah, index) => (
        <div key={index}>{hujah.attributes.body}</div>
      ))
    } else {
      displayChildren = (
        <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-light-grey fill-light-grey pt-0">
          <HujahIcon />
          <span className="ml-1">No response yet</span>
        </div>
      )
    }

    return (
      <div className="">
        <Navbar {...this.props} handleLogout={this.props.handleLogout} />
        <div id="navbar-bg"></div>
        <main className="container">
          <div className="row">
            <div className="col-12 d-flex flex-column align-items-center">
              <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_100,w_100/kjpulst4m0yei0cnsbbo.png" className="rounded-circle" />
              <h5>{full_name}</h5>
              <p>@{username}</p>
              <p>{headline}</p>
              <p>{location}</p>
              <p>{link}</p>
              <p>{hujah_count}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-flex flex-column align-items-center">
              {displayChildren}
            </div>
          </div>
        </main>
      </div>
    )
  }

}

export default UserProfile