import React from "react"
import { Link } from 'react-router-dom'
import AnnouncementIcon from '../Icons/announcement'
import HujahIcon from '../Icons/hujah'
import VoteIcon from '../Icons/votes'
import TrashIcon from '../Icons/trash'

class NotificationCard extends React.Component {

  constructor(props) {
    super(props)
    this.handleRead = this.handleRead.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleRead(event) {
    event.preventDefault()

    const { currentUser, notification } = this.props
    const { read, hujah } = notification.attributes

    if(read == false){
      const url = `/api/v1/${currentUser.username}/notifications/${notification.id}`
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
        .then(response => this.props.history.push(`/hoojah/${hujah.slug}`))
        .catch(error => console.log(error.message))
    } else {
      this.props.history.push(`/hoojah/${hujah.slug}`)
    }
  }

  handleDelete(event) {
    event.preventDefault()

    const { currentUser, notification } = this.props

    const url = `/api/v1/${currentUser.username}/notifications/${notification.id}`

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Network response was not ok.")
      })
      .then(response => this.props.history.push(`/${currentUser.username}/notifications`))
      .catch(error => console.log(error.message))
  }

  render() {
    const notification = this.props.notification
    const { body, category, read, hujah, subject_user } = notification.attributes

    if(category == "announcement"){
      return(
        <div id={`notification-${notification.id}`} className={`shadow card-body border-left-8 border-${read ? "read" : "unread"} border-bottom-0 py-0 pl-0 pr-2 d-flex align-items-center mb-1`}>
          <div className="media py-1 w-100">
            <div className="media-body">
              <div className="d-flex">
                <div className="d-flex align-items-center ml-3 btn-icon-14 fill-grey">
                  <AnnouncementIcon />
                </div>
                <div className="d-flex flex-column text-14 text-grey py-0 pr-1 ml-3">
                  <span>Announcement</span>
                  <div className="no-underscore py-0" onClick={this.handleRead}>
                    {body}
                  </div>
                </div>
                <div className="d-flex btn-icon-14 ml-auto btn-notification-trash align-items-center mr-2 fill-grey" onClick={this.handleDelete}>
                  <TrashIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if(category == "new_hoojah_response"){
      return(
        <div id={`notification-${notification.id}`} className={`shadow card-body border-left-8 border-${read ? "read" : "unread"} border-bottom-0 py-0 pl-0 pr-2 d-flex align-items-center mb-1`}>
          <div className="media py-1 w-100">
            <div className="media-body">
              <div className="d-flex">
                <div className="d-flex align-items-center ml-3 btn-icon-14 fill-grey">
                  <HujahIcon /> 
                </div>
                <div className="d-flex flex-column text-14 text-grey py-0 pr-1 ml-3">
                  <span>@{subject_user.username} posted a new argument on your hoojah</span>
                  <Link to={`/hoojah/${hujah.slug}`} className="no-underscore py-0 text-truncate d-block d-sm-none" style={{ maxWidth: '270px' }} dangerouslySetInnerHTML={{ __html: hujah.body }} onClick={this.handleRead}></Link>
                  <Link to={`/hoojah/${hujah.slug}`} className="no-underscore py-0 text-truncate d-none d-sm-block d-md-none" style={{ maxWidth: '310px' }} dangerouslySetInnerHTML={{ __html: hujah.body }} onClick={this.handleRead}></Link>
                  <Link to={`/hoojah/${hujah.slug}`} className="no-underscore py-0 text-truncate d-none d-md-block" style={{ maxWidth: '350px' }} dangerouslySetInnerHTML={{ __html: hujah.body }} onClick={this.handleRead}></Link>
                </div>
                <div className="d-flex btn-icon-14 ml-auto btn-notification-trash align-items-center mr-2 fill-grey" onClick={this.handleDelete}>
                  <TrashIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if(category == "new_vote"){
      return(
        <div id={`notification-${notification.id}`} className={`shadow card-body border-left-8 border-${read ? "read" : "unread"} border-bottom-0 py-0 pl-0 pr-2 d-flex align-items-center mb-1`}>
          <div className="media py-1 w-100">
            <div className="media-body">
              <div className="d-flex">
                <div className="d-flex align-items-center ml-3 btn-icon-14 fill-grey">
                  <VoteIcon /> 
                </div>
                <div className="d-flex flex-column text-14 text-grey py-0 pr-1 ml-3">
                  <span>You have a new vote on your hoojah</span>
                  <Link to={`/hoojah/${hujah.slug}`}className="no-underscore py-0 text-truncate d-block d-sm-none" style={{ maxWidth: '270px' }} dangerouslySetInnerHTML={{ __html: hujah.body }} onClick={this.handleRead}></Link>
                  <Link to={`/hoojah/${hujah.slug}`}className="no-underscore py-0 text-truncate d-none d-sm-block d-md-none" style={{ maxWidth: '310px' }} dangerouslySetInnerHTML={{ __html: hujah.body }} onClick={this.handleRead}></Link>
                  <Link to={`/hoojah/${hujah.slug}`}className="no-underscore py-0 text-truncate d-none d-md-block" style={{ maxWidth: '350px' }} dangerouslySetInnerHTML={{ __html: hujah.body }} onClick={this.handleRead}></Link>
                </div>
                <div className="d-flex btn-icon-14 ml-auto btn-notification-trash align-items-center mr-2 fill-grey" onClick={this.handleDelete}>
                  <TrashIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default NotificationCard
