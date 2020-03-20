import React from 'react'
import Popup from 'reactjs-popup'
import SignUp from './SignUp'
import { connect } from 'react-redux';
import { store } from '../../store'
import { login } from '../../actions/user'

class Login extends React.Component {
    constructor(props){
      super(props)
      this.state = store.getState()

    }

    handleSubmit = (e) => {
      console.log("SUBMITTING", e)
      if(!this.state.email || !this.state.password){
        return
      }

      const {
          props: { login },
          state: { email, password },
      } = this
      e.preventDefault()
      var user_obj = {email: this.state.email, password: this.state.password}
      login(user_obj).then(() =>{
          this.props.stateHandler(store.getState())
          this.props.userHandler()
      })
    }

    handleChange = (event) => {
      let user_obj = new Object()
      if (event.target.name === "email"){
        user_obj[event.target.name] =  event.target.value.toLowerCase()
      } else {
        user_obj[event.target.name] = event.target.value.toLowerCase()
      }
      this.setState(user_obj)
    }

    signupButton = () => {
      return(
        <Popup
            trigger = {<button className= "btn btn-outline-info btn-md" onClick={ this.signupClick }> Signup </button>}
            modal
            closeOnDocumentClick
        >
            {close => (<SignUp handler={close}/>)}
        </Popup>
      )
    }

    render(){
      return(
          <span className="form-group authHeader">
              <input className="form-control-sm" type="email" placeholder="email" name="email"  onChange={this.handleChange}/>
              <input className="form-control-sm" type="password" placeholder="password" name="password"  onChange={this.handleChange}/>
              <input className="btn btn-outline-success btn-md" onClick = { this.handleSubmit } type="submit" value = "Login"/>
              { this.signupButton() }
          </span>
      )
    }


}

export function mapStateToProps(state) {
  return {}
}

export const actionCreators = {
  login: login,
};

export default connect(
  mapStateToProps,
  actionCreators
)(Login);
