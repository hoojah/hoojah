import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'logo.svg'
import Loading from 'loading.svg'
import NewHoojahIcon from './Icons/new_hoojah'
import AgreeIcon from './Icons/agree'
import NeutralIcon from './Icons/neutral'
import DisagreeIcon from './Icons/disagree'
import ShareIcon from './Icons/share'

class Hujahs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hujahs: []
    };
  }

  componentDidMount() {
      const url = "/api/v1/hoojah/index"
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.")
        })
        .then(response => this.setState({ hujahs: response }))
        .catch(() => this.props.history.push("/"))
  }

  render() {
    const { hujahs } = this.state;
    const allHujahs = hujahs.map((hujah, index) => (

      <div key={index} className="col-12 sm-fluid mb-2">
        <div className="card border-0 rounded-0">
          <div className="card-header bg-transparent border-bottom-0 pb-0 d-flex justify-content-between">
            <div className="media">
              <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mr-3 avatar" />
              <div className="media-body">
                <div className="d-flex flex-column">
                  <Link to={`/users/${hujah.id}`} className="mt-0 mb-0">User Name</Link>
                  <a className="no-underscore handle">
                    <small className="text-muted">@user_handle</small>
                  </a>
                </div>
              </div>
            </div>
            <Link to="/hujah" className="btn-icon-16 fill-light-grey">
              <ShareIcon />
            </Link>
          </div>
          <div className="card-body pb-0">
            <Link to={`/hoojah/${hujah.id}`} className="">
              <h5 className="card-title text-black text-regular">{hujah.body}</h5>
            </Link>
          </div>
          <div className="card-body pt-0">
            <div className="d-flex justify-content-around">
              <a role="button" className="btn btn-outline-warning btn-lg btn-circle btn-icon-16 fill-agree"><AgreeIcon /></a>
              <a role="button" className="btn btn-outline-danger btn-lg btn-circle btn-icon-16 fill-neutral"><NeutralIcon /></a>
              <a role="button" className="btn btn-outline-info btn-lg btn-circle btn-icon-16 fill-disagree"><DisagreeIcon /></a>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="d-flex justify-content-around vote-bar">
              <div className="vote-bar-agree agree bg-agree"></div>
              <div className="vote-bar-neutral bg-neutral"></div>
              <div className="vote-bar-disagree bg-disagree"></div>
            </div>
          </div>
          <div className="card-footer text-muted d-flex justify-content-between">
            <small>Tom posted a hoojah</small>
            <small>2h</small>
          </div>
        </div>
      </div>
    ));
    const noHujah = (
      <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
        <img src={Loading} className="loading"/>
      </div>
    );

    return (
      <div className="">
        <nav className="navbar fixed-top navbar-light">
          <div className="container px-0 d-flex justify-content-between">
            <a className="navbar-brand">
              <img src={Logo} />
            </a>
            <Link to="/new_hujah" className="btn btn-link">Log in</Link>
            <div className="">
              <Link to="/hujah" className="btn btn-icon-24 fill-primary">
                <NewHoojahIcon />
              </Link>
            </div>
          </div>
        </nav>
        <div id="navbar-bg"></div>
        <main className="container">
          <div className="row">
            {hujahs.length > 0 ? allHujahs : noHujah}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    );
  }

}
export default Hujahs;
