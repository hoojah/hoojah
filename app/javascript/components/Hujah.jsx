import React from "react";
import { Link } from "react-router-dom";

class Hujah extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hujah: { 
        body: ""
      } 
    };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/hoojah/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          console.log(response)
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ hujah: response }))
      .catch(() => this.props.history.push("/"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  render() {
    const { hujah } = this.state;
    let voteResults = "No votes available";

    // if (hujah.votes.length > 0) {
    //   voteResults = hujah.votes
    //     .split(",")
    //     .map((vote, index) => (
    //       <li key={index} className="list-group-item">
    //         {vote}
    //       </li>
    //     ));
    // }

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {hujah.body}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Votes</h5>
                {voteResults}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger">
                Delete Hoojah
              </button>
            </div>
          </div>
          <Link to="/" className="btn btn-link">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
}

export default Hujah;