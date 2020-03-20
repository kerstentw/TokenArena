import React from "react"
import web3Handler from "../../services/web3_service"
import { validateEthereumAddress } from "../../services/web3_service"
import { store } from '../../store'
import AllTokenList from "./AllTokenList"
import { connect } from 'react-redux'

import { register_portfolio } from '../../actions/portfolio'// This should be encapsulated in an index.js

//TODO: UNFUCK THIS

class Picker extends React.Component {
    // Lists token names and gets prices
    constructor(props){
        super(props)

        let user_state = store.getState().user
        console.log("\n\n user_state ", store.getState())
        let initialFormState = {
            user_id: user_state.id
        }

        this.web3Handler = new web3Handler()
        this.state = {
                       form_valid: false,
                       user_addr: null,
                       addr_stat: "Please Enter an Ethereum Address",
                       form: initialFormState,
                       user_state: user_state,
                       stat: "Please Fill in all Fields"
                     }
    }


    addressEntry = (_event) => {
      let target = _event.target
      var eth_addr = this.web3Handler.validateEthereumAddress(target.value)
      if (eth_addr) {

        let cur_form = Object.assign({},this.state.form)
        cur_form["addr"] = target.value
        this.setState({user_addr: target.value, form: cur_form})
      }
        this.setState({addr_stat: <span className="invalid">Invalid Address</span>})
    }

    mockPortfolio = () => {
        return (
          <AllTokenList validateForm={this.validateForm} mode = "mock"/>
        )
    }


    livePortfolio = () => {
        return (

          this.state.user_addr?
              <div>
                  <input type="text"  className="form-control form-control-sm" placeholder="Live-Net Address" value= {this.state.user_addr} name = "addr" onChange={this.addressEntry}/>
                  <AllTokenList address={this.state.user_addr} validateForm={this.validateForm} web3Handler = {this.web3Handler} className = "animated slideOutDown" mode = "live"/>
              </div>
            :
              <div>
                  <input className="form-control form-control-sm" type="text" placeholder="Live-Net Address" name = "user_addr" onChange={this.addressEntry}/><br/>
                  {this.state.addr_stat}
              </div>

        )
    }


    pick_mode = (_mode) => {
        let choices = {
          live: this.livePortfolio,
          mock: this.mockPortfolio
        }
        return choices[_mode]
    }


    onInputFocusOut = (_event)=>{
        let target = _event.target
        let updater = Object.assign({},this.state.form)
        updater[target.name] = target.value
        this.validateForm(updater)
        console.log(this.state.form)
    }


    updateForm = (_formstate) => { // Should only send forms here
        //TODO: Validation and Sanitation
        _formstate["asset_list"] = _formstate.active_tokens
        let new_state = Object.assign({},this.state.form,_formstate)
        //TODO: translation of active_tokens...
        return new_state
    }

    validateForm = (_newFormState)=>{ //PURE
        //var state_form = this.state.form

        var new_form = this.updateForm(_newFormState)
        console.log("VALIDATING...", new_form)
        if (
              new_form.user_id &&
              new_form.type &&
              new_form.folio_name &&
              new_form.asset_list &&
              this.state.form_valid === false
          ){
          console.log("VALID")
          this.setState({form_valid: true, stat: "Click Register to Continue", form: new_form})
        } else if (
              (!new_form.user_id ||
              !new_form.type ||
              !new_form.folio_name ||
              !new_form.asset_list) ) {
          console.log("NOT VALID")
          this.setState({form_valid: false, stat: "Please fill in All fields", form: new_form})
        } else {

        }
    }


    submitPortfolio = async () => {
        const { register_portfolio } = this.props
        console.log("submitPortfolio Submitting", this.state.form)
        const id = await register_portfolio(this.state.form)
        console.log(id)
    }


    render(){

      return(
        <div>
          <div className="form-group">
            <h4>Create {this.props.mode} Portfolio</h4>
            <input className="form-control form-control-sm" name= "folio_name" onChange={this.onInputFocusOut} type="text"  placeholder="Portfolio Name" />
            { this.pick_mode(this.props.mode)() }
          </div>
          <span>
            {this.state.stat}
          </span>
          <button disabled={!this.state.form_valid} onClick={this.submitPortfolio} className="btn btn-outline-success float-right"> Register </button>

        </div>
        )
    }

}

export function mapStateToProps(state) {
  return {}
}

export const actionCreators = {
  register_portfolio: register_portfolio
}


export default connect(
  mapStateToProps,
  actionCreators
)(Picker)
