import React from 'react'
import { Link } from 'react-router-dom'
import Logo from 'logo.svg'

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
              <div className="rounded-circle mr-3 avatar">avatar</div>
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
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No hoojahs yet. Why not <Link to="/new_hujah">create one</Link>
        </h4>
      </div>
    );

    return (
      <div className="">
        <nav className="navbar fixed-top navbar-light bg-light">
          <div className="container d-flex justify-content-between flex-row-reverse">
            <a className="navbar-brand">
              <img src={Logo} />
            </a>
            <div className="d-flex">
              <form className="form-inline my-2 my-lg-0 d-none d-lg-inline-block">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-primary my-2 my-sm-0">
                  search icon
                </button>
              </form>
              <Link to="/new_hujah">Log in</Link>
            </div>
          </div>
        </nav>
        <main className="container">
          <div className="text-right mb-3">
            <Link to="/hujah" className="btn custom-button">
              Create New Hoojah
            </Link>
          </div>
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
