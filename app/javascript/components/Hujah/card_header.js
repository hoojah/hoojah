import React, { Fragment } from "react"
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
    const { hujah, hujahParentAvailable } = this.props
    const { parent, user, body } = hujah.attributes
    const { full_name, username } = user.attributes

    const messageForSocialMedia = `AGREE? NEUTRAL? DISAGREE?: "${body} (by @${username})"`
    const socialMediaButtonUrl = window.location.href
    const socialMediaButtonClass = "px-3 py-1"

    return(
      <Fragment>
        { hujahParentAvailable ? <HujahCardParent hujah={parent} /> : null }

        <div className="card-header border-bottom-0 pb-0 d-flex justify-content-between align-items-center">
          <div className="media">
            <img src="https://res.cloudinary.com/rudzainy/image/upload/c_fill,h_42,w_42/kjpulst4m0yei0cnsbbo.png" className="rounded-circle mr-3 avatar" />
            <div className="media-body">
              <div className="d-flex flex-column">
                <p className="mt-0 mb-0 text-primary">{full_name}</p>
                <a className="no-underscore handle">
                  <small className="text-muted">{`@${username}`}</small>
                </a>
              </div>
            </div>
          </div>
          <div className="dropdown">
            <button className="btn btn-icon-16 fill-light-grey p-0" type="button" id="moreAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <ShareIcon />
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="moreAction">
              <h6 className="dropdown-header">Share this hoojah via</h6>
              <FacebookShareButton 
                url={socialMediaButtonUrl}
                quote={messageForSocialMedia} 
                hashtag="#hoojah" 
                className={socialMediaButtonClass}>
                <FacebookIcon size={24} borderRadius={48} className="mr-1" /> Facebook
              </FacebookShareButton>
              <TwitterShareButton 
                url={socialMediaButtonUrl}
                title={messageForSocialMedia}
                via="hoojah_my" 
                hashtags={["hoojah", "discussions", "malaysia"]} 
                className={socialMediaButtonClass}>
                <TwitterIcon size={24} borderRadius={48} className="mr-1" /> Twitter
              </TwitterShareButton>
              <WhatsappShareButton 
                url={socialMediaButtonUrl}
                title={messageForSocialMedia}
                className={socialMediaButtonClass}>
                <WhatsappIcon size={24} borderRadius={48} className="mr-1" /> WhatsApp
              </WhatsappShareButton>
              <TelegramShareButton 
                url={socialMediaButtonUrl}
                title={messageForSocialMedia}
                className={socialMediaButtonClass}>
                <TelegramIcon size={24} borderRadius={48} className="mr-1" /> Telegram
              </TelegramShareButton>
              <RedditShareButton 
                url={socialMediaButtonUrl}
                title={messageForSocialMedia}
                className={socialMediaButtonClass}>
                <RedditIcon size={24} borderRadius={48} className="mr-1" /> Reddit
              </RedditShareButton>
              <EmailShareButton 
                url={socialMediaButtonUrl}
                subject={messageForSocialMedia}
                body="hello@hoojah.my" 
                className={socialMediaButtonClass}>
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
