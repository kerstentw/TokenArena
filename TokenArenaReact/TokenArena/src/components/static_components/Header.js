import React from "react"
import Popup from 'reactjs-popup'
import FAQ from './FAQ'
import SeasonInfo from './SeasonInfo'
import Login from '../Auth/Login'
import { connect } from 'react-redux'
import { store } from '../../store'
import { logout } from '../../actions/user'
import { LogoutIcon } from '../../constants/icons'

class Header extends React.Component {

    constructor(props){
      super(props)
      this.state = store.getState()
      console.log("Header-State", this.state)

    }

    checkForUser = (_state) =>{
        // TODO: State Validation
        console.log("STATE GOT:", _state)

        this.setState(_state)
        console.log("USER CHECK Header-State", this.state)

    }

    componentDidMount () {
      this.state = store.getState()
    }

    toggleRegister = ()=>{
      this.props.toggle_handler()
    }

    logoutClick = async () => {
        const { logout } = this.props
        logout().then(
          () => {
            this.setState(store.getState())
            this.props.userHandler()
          })
        console.log("CURRENT LOG::: ", store.getState())
    }

    renderLoginContext = () => {

        if (this.state.user.id){
          return (
            <span>
              <a onClick={this.logoutClick}>
                <LogoutIcon />
              </a>
                  <button className="btn btn-outline-danger float-right btn-sm" onClick = {this.toggleRegister}>
                      {this.state.user.email}
                  </button>

            </span>
                )
        } else {
          return (<Login userHandler = {this.props.userHandler} stateHandler={this.checkForUser}/>)
        }

    }

    render() {

        return (
          <div className="d-flex justify-content-right header-offset">
          <div className="container-fluid">
             <div className="">
              <span className="col-md-6">
                  <a href="/">
                    <span className="header-text token-text">TOKEN</span>
                    <span className="header-text clash-text">ARENA</span>
                    <span className="small-text"> ETH edition</span>
                  </a>
              </span>
              <span className="col-md-6 headerButtons">
                  <a href = "/#arenas" className="header-link"> Arenas </a>
                  <Popup
                      trigger = {<a href="javascript:void(0)" className="header-link"> Season Info </a>}
                      modal
                      closeOnDocumentClick
                  >
                      {close => (<SeasonInfo handler={close}/>)}
                  </Popup>

                  <a href = "/#about" className="header-link"> About </a>

                  <Popup
                      trigger = {<a href="javascript:void(0)" className="header-link"> FAQ </a>}
                      modal
                      closeOnDocumentClick
                  >
                      {close => (<FAQ handler={close}/>)}
                  </Popup>


                  <a href="/dataroom" className="header-link"> DataRoom </a>




              </span>
              {this.renderLoginContext()}

            </div>

          </div>
          </div>
        )

    }
}



export function mapStateToProps(state) {
  return {}
}

export const actionCreators = {
  logout: logout
}

export default connect(
  mapStateToProps,
  actionCreators
)(Header)

//export default Header
