import React from 'react'
import $ from 'jquery'
import Navbar from './Layouts/navbar'
import LoadingAnimation from './Layouts/loading_animation'
import NotificationIcon from './Icons/notification'
import NotificationCard from './Notifications/card'

class NotificationsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notifications: {},
      userHasNotifications: false
    }
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props

    const url = `/api/v1/users/${id}/notifications`

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => {
        const notifications = response.data
        this.setState({ 
          notifications: notifications,
          userHasNotifications: notifications.length > 0,
        })
      })
      .catch(() => this.props.history.push("/"))
  }

  render() {
    if($.isEmptyObject(this.state.notifications)){
      return (
        <LoadingAnimation />
      )
    }

    const { notifications, userHasNotifications } = this.state

    var displayNotifications = null
    if(userHasNotifications) {
      displayNotifications = notifications.map((notification, index) => (
        <NotificationCard key={index} notification={notification} />
      ))
    } else {
      displayNotifications = (
        <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-light-grey fill-light-grey pt-0">
          <NotificationIcon />
          <span className="ml-1">You have no notifications</span>
        </div>
      )
    }
    
    return (
      <div className="">
        <Navbar {...this.props} handleLogout={this.props.handleLogout} />
        <main className="container">
          <div className="row mt-2 justify-content-center">
            <div className="col-12 col-lg-6 col-md-8 d-flex flex-column px-0">
              {displayNotifications}
            </div>
          </div>
        </main>
      </div>
    )
  }
}

export default NotificationsIndex
