import React from 'react'
import Loading from 'loading.svg'

class LoadingAnimation extends React.Component {

  shouldComponentUpdate() {
    return false
  }
  
  render() {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <img src={Loading} className="loading" style={{ marginTop: "-100px" }} />
      </div>
    )
  }
}

export default LoadingAnimation
