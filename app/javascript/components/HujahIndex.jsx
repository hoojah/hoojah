import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'logo.svg'
import Loading from 'loading.svg'
import NewHoojahIcon from './Icons/new_hoojah'

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
          <div className="card-header bg-transparent border-top">
            <div className="media">
              <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mr-3 avatar" />
              <div className="media-body">
                <div className="d-flex flex-column">
                  <a className="mr-1 mt-0 mb-0">User Name</a>
                  <a className="no-underscore">
                    <small className="text-muted">@user_handle </small>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <Link to={`/hoojah/${hujah.id}`} className="btn custom-button">
              <h5 className="card-title">{hujah.body}</h5>
            </Link>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-around">
              <button type="button" className="btn btn-primary btn-lg">Agree</button>
              <button type="button" className="btn btn-neutral btn-lg">Neutral</button>
              <button type="button" className="btn btn-disagree btn-lg">Disagree</button>
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
          <div className="container d-flex justify-content-between">
            <a className="navbar-brand">
              <img src={Logo} />
            </a>
            <Link to="/new_hujah" className="btn btn-link">Log in</Link>
            <div className="">
              <Link to="/hujah" className="btn btn-icon">
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
