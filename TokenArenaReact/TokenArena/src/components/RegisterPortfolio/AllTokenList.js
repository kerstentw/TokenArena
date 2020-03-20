import React from "react"
import TOKENS from "../../constants/listed"



class  AllTokenList extends React.Component {
    // props.updateForm() updates parent form.  validation needs to be
    // handled elsewhere
    constructor(props) {
        super(props)
        this.state = {
          mode: this.props.mode,
          //rows: this.buildTokenList(),
          address: this.props.address,
          active_tokens: new Object(),  //Needs to be an Array?
          type: this.props.mode
        }

    }



    onCheckBox = async (_event)=> {
        var target = _event.target
        var sym = target.value

      if (target.checked === true) {
        let balance = await this.props.web3Handler.lookupAmountInWallet(this.state.address, sym)
        balance = parseFloat(balance)
        let new_active = Object.assign({}, this.state.active_tokens)
        new_active[sym] = balance
        this.setState({active_tokens: new_active}) //TODO: This is some dirty shit, move this state into the parent class
        this.props.validateForm({active_tokens: new_active, type: this.state.mode})

      } else {
        let new_active = Object.assign({}, this.state.active_tokens)
        new_active[sym] = "-"
        this.setState({active_tokens: new_active}) //TODO: This is some dirty shit, move this state into the parent class
        this.props.validateForm({active_tokens: new_active, type: this.state.mode})
      }
    }



    onNumberEntry= (_event) => {
        let target = _event.target
        let new_active = Object.assign({}, this.state.active_tokens)
        console.log("ACTIVE::: ", new_active)
        new_active[target.name] = parseFloat(target.value) //Balances
        this.setState({active_tokens: new_active})
        this.props.validateForm({active_tokens: new_active, type: this.state.mode})

    }


    determineInput = (_symbol) => {
      var mode = this.props.mode
      return (
          mode === "mock" ?
            <td><input className="tokenInput" onChange={this.onNumberEntry} name = {_symbol} type="number" min="0" max="100"/></td>
            :
            <td><input className="tokenInput" type="checkbox" onChange={this.onCheckBox} name={_symbol} value={_symbol}/></td>
      )
    }

    renderAmount = (_base_obj) => {
      if(_base_obj){
        return Math.round(_base_obj * 1000) / 1000
      } else {
        return "-"
      }

    }

    buildRow = (_base_struct) => {
        return( <tr>
                  <td><img className="tokenLogo" src={_base_struct.token_logo}/></td>
                  <td>{_base_struct.symbol}</td>
                  {this.determineInput(_base_struct.symbol)}
                  {this.props.mode !== "mock"? <input readOnly="readonly" value={this.state.active_tokens[_base_struct.symbol]} placeholder="-"/>   : null }
                </tr>
              )
    }

    buildTokenList = () => {
      var rows = []

      for (let i = 0; i < TOKENS.length; i++){
          rows.push(this.buildRow(TOKENS[i]))
      }

      return rows

    }

    renderModalHeader = () => {
      var mode = this.props.mode === "mock" ?
          <tr>
            <th>
            </th>
            <th>
              Sym
            </th>
            <th>
              Amt
            </th>
          </tr>
          :
          <tr>
            <th>
            </th>
            <th>
              Sym
            </th>
            <th>
              Use
            </th>
            <th>
              Amt
            </th>
          </tr>
          return mode

    }

    buildStructure = () => {
        var mode = this.renderModalHeader()
        var rows = this.buildTokenList()
        return(
            <div>
                <div className="tokenList">
                <table className="table table-striped">
                  <tbody>
                  {mode}
                  {rows}
                  </tbody>
                </table>
                </div>
            </div>

        )
    }

    render(){


        return(
            <div>
              {this.buildStructure()}
            </div>
        )
    }

}


export default AllTokenList
