import React from 'react'
import Navbar from './Layouts/navbar'
import HujahCard from './Hujah/card'
import Loading from 'loading.svg'

class HujahIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allHujah: []
    }
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

    const displayLoadingAnimation = (
      <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
        <img src={Loading} className="loading" style={{ marginTop: "-100px" }} />
      </div>
    )
      
    return (
      <div className="">
        <Navbar {...this.props} handleLogout={this.props.handleLogout} />
        <div id="navbar-bg"></div>
        <main className="container">
          <div className="row">
            {allHujah.length > 0 ? displayAllHujah : displayLoadingAnimation}
          </div>
        </main>
      </div>
    )
  }

}
export default HujahIndex
