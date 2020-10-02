import React from "react"
import { Link } from 'react-router-dom'
import AnnouncementIcon from '../Icons/announcement'
import HujahIcon from '../Icons/hujah'
import VoteIcon from '../Icons/votes'

class NotificationCard extends React.Component {

  constructor(props) {
    super(props)
    this.handleRead = this.handleRead.bind(this)
  }

  handleRead(event) {
    const { currentUser, notification } = this.props
    const { read, hujah } = notification.attributes

    event.preventDefault()

    if(read == false){
      const url = `/api/v1/users/${currentUser.id}/notifications/${notification.id}`
      const body = { read: !read }

      const token = document.querySelector('meta[name="csrf-token"]').content
      fetch(url, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error("Network response was not ok.")
        })
        .then(response => this.props.history.push(`/hoojah/${hujah.id}`))
        .catch(error => console.log(error.message))
    } else {
      this.props.history.push(`/hoojah/${hujah.id}`)
    }
  }

  render() {
    const notification = this.props.notification
    const { body, category, read, hujah, subject_user } = notification.attributes

    if(category == "announcement"){
      return(
        <div>
          <div className={`shadow card-body border-left-8 border-${read ? "read" : "unread"} border-bottom-0 py-0 pl-0 pr-2 d-flex align-items-center mb-1`}>
            <div className="media py-1">
              <div className="media-body">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-grey fill-grey py-0">
                    <AnnouncementIcon /> 
                    <span className="ml-1">Announcement</span>
                  </div>
                  <div className="d-flex align-items-center text-14 card-body py-0">
                    {body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if(category == "new_hoojah_response"){
      return(
        <Link to={`/hoojah/${hujah.id}`} className="no-underscore">
          <div className={`shadow card-body border-left-8 border-${read ? "read" : "unread"} border-bottom-0 py-0 pl-0 pr-2 d-flex align-items-center mb-1`} onClick={this.handleRead}>
            <div className="media py-1">
              <div className="media-body">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-grey fill-grey py-0">
                    <HujahIcon /> 
                    <span className="ml-1">@{subject_user.username} posted a new argument on your hoojah </span>
                  </div>
                  <div className="text-14 card-body py-0 text-truncate d-block d-sm-none" style={{ maxWidth: '270px' }} dangerouslySetInnerHTML={{ __html: hujah.body }}></div>
                  <div className="text-14 card-body py-0 text-truncate d-none d-sm-block d-md-none" style={{ maxWidth: '310px' }} dangerouslySetInnerHTML={{ __html: hujah.body }}></div>
                  <div className="text-14 card-body py-0 text-truncate d-none d-md-block" style={{ maxWidth: '350px' }} dangerouslySetInnerHTML={{ __html: hujah.body }}></div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )
    } else if(category == "new_vote"){
      return(
        <Link to={`/hoojah/${hujah.id}`} className="no-underscore">
          <div className={`shadow card-body border-left-8 border-${read ? "read" : "unread"} border-bottom-0 py-0 pl-0 pr-2 d-flex align-items-center mb-1`}>
            <div className="media py-1">
              <div className="media-body">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center text-14 card-body btn-icon-14 text-grey fill-grey py-0">
                    <VoteIcon /> 
                    <span className="ml-1">You have a new vote on your hoojah </span>
                  </div>
                  <div className="text-14 card-body py-0 text-truncate d-block d-sm-none" style={{ maxWidth: '270px' }} dangerouslySetInnerHTML={{ __html: hujah.body }}></div>
                  <div className="text-14 card-body py-0 text-truncate d-none d-sm-block d-md-none" style={{ maxWidth: '310px' }} dangerouslySetInnerHTML={{ __html: hujah.body }}></div>
                  <div className="text-14 card-body py-0 text-truncate d-none d-md-block" style={{ maxWidth: '350px' }} dangerouslySetInnerHTML={{ __html: hujah.body }}></div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )
    }
  }
}

export default NotificationCard
