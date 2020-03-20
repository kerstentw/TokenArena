import React from "react"
import Picker from "./Picker"
import PortfolioList from "./PortfolioList"
import { MOCK_PORTFOLIO_DATA } from '../../mock_data/mock_data'
import { store } from '../../store'

class Register extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          picker_mode: "initial" // live, mock, initial
        }  //Get From Store
    }

    button_press = (_selection)=>{
      this.setState({picker_mode: _selection})
    }

    reselectPortfolio = () => {
        this.setState({picker_mode: "initial"})
    }

    grabPortfolios = () => {
      let folios = store.getState().user.portfolios
      console.log("FOLIOS ", folios)
      return folios
    }

    renderInitialState = ()=>{
        return (

          <div>
            <h4> Registered Portfolios </h4>
            <PortfolioList folio_data = {this.grabPortfolios()}/>
            <h4> New Portfolio </h4>
            <button className="btn btn-outline-info center" onClick={()=> this.button_press('live')}>Livenet Portfolio</button><br/>
            <button className="btn btn-outline-info center" onClick={()=> this.button_press('mock')}>Custom Portfolio</button>
          </div>
        )
    }

    render() {

      let reg_state = this.state.picker_mode === "mock" || this.state.picker_mode ==="live" ? <Picker backButton={this.reselectPortfolio} mode={this.state.picker_mode}/>
      : this.renderInitialState()
      let back_button = this.state.picker_mode === "initial"? null : <a className="close-x" onClick={this.reselectPortfolio} href="#">BACK</a>


      return (

          <div className= "register animated slideInRight fast" >
              <a className="close-x" onClick={this.props.toggleControl} href="#">X</a>
              {back_button}

              <h2>Manage Portfolios </h2>

              {reg_state}

          </div>
      )
    }

}

export default Register
