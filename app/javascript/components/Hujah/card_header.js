import React, { Fragment } from "react"
import { Link } from 'react-router-dom'
import ShareIcon from '../Icons/share'
import HujahCardParent from './card_parent'
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share"

class HujahCardHeader extends React.Component {
  render() {
    const { hujah, hujahParent, user } = this.props
    
    return(
      <Fragment>
        { hujahParent == null ? null : <HujahCardParent hujah={hujahParent} /> }

        <div className="card-header border-bottom-0 pb-0 d-flex justify-content-between align-items-center">
          <div className="media">
            <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/hoojah-user-avatar-2.jpg" className="rounded-circle mr-3 avatar" />
            <div className="media-body">
              <div className="d-flex flex-column">
                <Link to={"/"} className="mt-0 mb-0">{user.attributes.full_name}</Link>
                <a className="no-underscore handle">
                  <small className="text-muted">{`@${user.attributes.username}`}</small>
                </a>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <button className="btn btn-icon-16 fill-light-grey" type="button" id="moreAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <ShareIcon />
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="moreAction">
              <h6 className="dropdown-header">Share this hoojah via</h6>
              <FacebookShareButton 
                url={window.location.href}
                quote={`AGREE? NEUTRAL? DISAGREE?: "${hujah.attributes.body} (by @${user.attributes.username})"`} 
                hashtag="#hoojah" 
                className="px-3 py-1">
                  <FacebookIcon size={24} borderRadius={48} className="mr-1" /> Facebook
              </FacebookShareButton>
              <TwitterShareButton 
                url={window.location.href}
                title={`AGREE? NEUTRAL? DISAGREE?: "${hujah.attributes.body} (by @${user.attributes.username})"`}
                via="hoojah_my" 
                hashtags={["hoojah", "discussions", "malaysia"]} 
                className="px-3 py-1">
                <TwitterIcon size={24} borderRadius={48} className="mr-1" /> Twitter
              </TwitterShareButton>
              <WhatsappShareButton 
                url={window.location.href}
                title={`AGREE? NEUTRAL? DISAGREE?: "${hujah.attributes.body} (by @${user.attributes.username})"`}
                className="px-3 py-1">
                <WhatsappIcon size={24} borderRadius={48} className="mr-1" /> WhatsApp
              </WhatsappShareButton>
              <TelegramShareButton 
                url={window.location.href}
                title={`AGREE? NEUTRAL? DISAGREE?: "${hujah.attributes.body} (by @${user.attributes.username})"`}
                className="px-3 py-1">
                <TelegramIcon size={24} borderRadius={48} className="mr-1" /> Telegram
              </TelegramShareButton>
              <RedditShareButton 
                url={window.location.href}
                title={`AGREE? NEUTRAL? DISAGREE?: "${hujah.attributes.body} (by @${user.attributes.username})"`}
                className="px-3 py-1">
                <RedditIcon size={24} borderRadius={48} className="mr-1" /> Reddit
              </RedditShareButton>
              <EmailShareButton 
                url={window.location.href}
                subject={`AGREE? NEUTRAL? DISAGREE?: "${hujah.attributes.body} (by @${user.attributes.username})"`}
                body="hello@hoojah.my" 
                className="px-3 py-1">
                <EmailIcon size={24} borderRadius={48} className="mr-1" /> Email
              </EmailShareButton>
            </div>
          </div>



        </div>
      </Fragment>
    )
  }
}

export default HujahCardHeader
