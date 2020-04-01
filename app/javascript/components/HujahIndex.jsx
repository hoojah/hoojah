import React from 'react'
import { Link } from 'react-router-dom'

class Hujahs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hujahs: []
    };
  }

  componentDidMount() {
      const url = "/api/v1/hujahs/index"
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
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{hujah.body}</h5>
            <Link to={`/hujah/${hujah.id}`} className="btn custom-button">
              View hoojah
            </Link>
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
      <div className="py-5">
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

// export default () => (
//   <div className='container'>
//     <div className='row'>
//       <div className='col'>
//         <Link 
//           to='/hujahs'
//           className='btn btn-lg'
//           role='button' >
//             View Hoojah
//         </Link>
//       </div>
//     </div>
//   </div>
// )
