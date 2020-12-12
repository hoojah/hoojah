import React from 'react'
import Navbar from './Layouts/navbar'
import HujahCard from './Hujah/card'
import HujahPinned from './Hujah/pinned'
import LoadingAnimation from './Layouts/loading_animation'

class HujahIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allHujah: []
    }
  }

  userIsLoggedIn() {
    return this.props.loggedInStatus
  }

  componentDidMount() {
    const url = "/api/v1/hoojah/index"
    
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => {
        this.setState({ allHujah: response.data })
      })
      .catch(() => this.props.history.push("/"))
  }

  render() {
    const { allHujah } = this.state

    const displayAllHujah = allHujah.map((hujah, index) => (
      <HujahCard {...this.props} key={index} hujah={hujah} />
    ))
      
    return (
      <div className="">
        <Navbar {...this.props} handleLogout={this.props.handleLogout} />
        <main className="container">
          <div className="row justify-content-sm-center">
            <div className="col-12 col-lg-6 col-md-8 sm-fluid mb-3">
              {this.userIsLoggedIn() ? null : <HujahPinned />}
              {allHujah.length > 0 ? displayAllHujah : <LoadingAnimation />}
            </div>
          </div>
        </main>
      </div>
    )
  }

}

export default HujahIndex
