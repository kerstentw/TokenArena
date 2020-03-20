import React from 'react'
import web3Handler from "../../services/web3_service"
import PortfolioList from '../RegisterPortfolio/PortfolioList'
import { store } from '../../store'
import { connect } from 'react-redux'

import  register_arena  from '../../actions/arena'

class CreateArena extends React.Component{

    constructor(props){
      super(props)
      var web3 = new web3Handler()
      this.state = {
          web3_addr: web3.generateAddress(),
          form_valid: false,
          form: {
            folio_type: this.props.folio_type
          }
      }
    }

    cancel = () =>{
      this.props.handler()
    }

    grabPortfolios = () => {
      let folios = store.getState().user.portfolios
      return folios
    }

    validateFormMember = (_keys, _struct, _search) => { // Maybe move this to a util?
        return _struct[_keys[_keys.indexOf(_search)]] || false
    }

    validateForm = (_form_struct) => {

        let keys = Object.keys(this.state.form)
        let form = Object.assign({}, this.state.form)

        if (
          this.validateFormMember(keys, form, "home_folio")  &&  // This could be DRY'd out
          this.validateFormMember(keys, form, "name")  &&
          this.validateFormMember(keys, form, "increment")
        ){

            if (this.state.form_valid === false) this.setState(Object.assign({},{form_valid: true}))

        } else if (this.state.form_valid === true) {
          this.setState(Object.assign({},{form_valid: false}))
        }
    }

    registerArena = () => {
      // Calls Action for submitting Arena to backend
      // TODO: Add in Action Call and State Change

      const { register_arena } = this.props
      register_arena(this.state.form)

      console.log("Current Form: ", this.state.form)
    }

    updateFolioState = (_folio) => {  // Passed as Prop.  Event Handler There
      //TODO: Input Validator
      this.setState(Object.assign({}, {form: {...this.state.form, home_folio: _folio}} ))

    }

    updateNameState = (_event) => {
      //TODO: Input Validator
      this.setState(Object.assign({}, {form: {...this.state.form, name: _event.target.value}} ))

    }

    updateDescriptionState = (_event) => {
      window.alert(_event.target.value)
      this.setState(Object.assign({}, {form: {...this.state.form, description: _event.target.value}}))
    }

    updateIncrementState = (_event) => {
      //TODO: Input Validator
      this.setState(Object.assign({}, {form: {...this.state.form, increment: _event.target.value}} ))

    }

    renderPortfolios = (_portfolios) => {
      this.validateForm()

      return(
        <div className="createArenaCard">
         <form>
          <h2> Create Arena </h2>
          <h5> Your Portfolios </h5>

          <PortfolioList
               folio_type = { this.props.folio_type }
               folio_data = { _portfolios }
               context="select"
               state_injector = { this.updateFolioState }
          />

          <input onChange = { this.updateNameState } type="text" name = "folio_name" placeholder="Arena Name"/><br/>
          <textarea value="Description (optional)" onChange={this.updateDescriptionState}> </textarea>

          <div>
               Arena Expiration:
               <div>
                 3 Hours  <input onChange = {this.updateIncrementState} name="timelapse" value="3h" type="radio"/><br/>
                 12 Hours <input onChange = {this.updateIncrementState} name="timelapse" value="12h" type="radio"/><br/>
                 1 Day    <input onChange = {this.updateIncrementState} name="timelapse" value="1d" type="radio"/><br/>
                 3 Days   <input onChange = {this.updateIncrementState} name="timelapse" value="3d" type="radio"/><br/>
               </div>
          </div>

          <div>
            <button onClick = {this.cancel} className= "btn btn-outline-danger float-right"> Cancel </button>
            <button disabled = { !this.state.form_valid } onClick = {this.registerArena} type="button" className= "btn btn-outline-success float-right"> Create </button>
          </div>
        </form>
      </div>
      )
    }

    render(){
      let portfolios = this.grabPortfolios()

      if (portfolios){
        var page = this.renderPortfolios(portfolios)
      } else {
        var page = "No Portfolios Detected.  Please Create a Portfolio first."
      }

      return <div> {page} </div>

    }

}


const actionCreators = {
  register_arena: register_arena
}

export function mapStateToProps() {
  return {}
}

export default connect(
  mapStateToProps,
  actionCreators
)(CreateArena)
//export default CreateArena
