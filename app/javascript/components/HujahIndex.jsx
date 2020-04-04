import React from 'react'
import Loading from 'loading.svg'
import Navbar from './Layouts/navbar'
import HujahCard from './Hujah/card'

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
      <HujahCard key={index} hujah={hujah} totalVoteCount={ hujah.agree_count + hujah.neutral_count + hujah.disagree_count} />
    ));

    const noHujah = (
      <div className="vw-100 vh-100 d-flex align-items-center justify-content-center">
        <img src={Loading} className="loading"/>
      </div>
    );

    return (
      <div className="">
        <Navbar />
        <div id="navbar-bg"></div>
        <main className="container">
          <div className="row">
            {hujahs.length > 0 ? allHujahs : noHujah}
          </div>
        </main>
      </div>
    );
  }

}
export default Hujahs;
