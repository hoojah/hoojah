import React from 'react'
import MoreActionsIcon from '../Icons/more_actions'
import ButtonBack from '../Layouts/button_back'

class NavbarHujah extends React.Component {
  render() {
    return(
      <nav className="navbar bg-transparent pt-0">
        <div className="container px-0 d-flex justify-content-between">
          <ButtonBack />

          <div class="dropdown">
            <button class="btn btn-icon-24 fill-primary dropdown-toggle" type="button" id="moreAction" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <MoreActionsIcon />
            </button>
            <div class="dropdown-menu" aria-labelledby="moreAction">
              <button class="dropdown-item" type="button" onClick={this.deleteRecipe}>Delete hoojah</button>
              <button class="dropdown-item" type="button">Flag hoojah</button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavbarHujah
