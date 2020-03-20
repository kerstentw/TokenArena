import React from 'react'
import Popup from 'reactjs-popup'
import PortfolioView from '../static_components/PortfolioView'

class PortfolioList extends React.Component { //TODO: Turn into Function Component
  constructor(props){
    // props is structured Data
    super(props)
  }


  insertSelector = (_portfolio_info) => {
    if (this.props.context === "select") {
      return (
        <td>
            <input type="radio"
              name = "profile_selector"
              onChange= { () => {this.props.state_injector(_portfolio_info)} }
            />
        </td>
      )
    }
  }

  buildRow = (_data) => {
    return (
      <tr className = {_data._id} >

        { this.insertSelector(_data) }

        <Popup
            trigger = { <td> {_data.folio_name} </td> }
            modal
            closeOnDocumentClick
        >
            {close => (<PortfolioView portfolio = {_data} />)}
        </Popup>

        <Popup
            trigger = { <td> {_data.type} </td> }
            modal
            closeOnDocumentClick
        >
            {close => (<PortfolioView portfolio = {_data} />)}
        </Popup>
        </tr>
    )
  }

  buildSelectHeader = () => {
    if (this.props.context === "select"){
      return (
      <th>
        Select
      </th>
      )
    }
  }

  buildHeaders = () => {
    return (
      <tr>
        { this.buildSelectHeader() }
        <th>
          Name
        </th>
        <th>
          Type
        </th>
      </tr>) //TODO: EXPORT THIS ELSEWHERE
  }

  buildTable = () => {
    let folio_data = this.props.folio_data //list
    let folio_type = this.props.folio_type
    var rows = []
    rows.push(this.buildHeaders())
    console.log("folio_data",folio_data)

    for (let i = 0; i < folio_data.length; i++){
        if (folio_type && folio_data[i].type === this.props.folio_type){
            rows.push(this.buildRow(folio_data[i]))
        } else if (!folio_type) {
            rows.push(this.buildRow(folio_data[i]))
        }

    }

    return rows

  }


  render(){
    var table = this.props.folio_data?
                                  <div className="folio-table">
                                   <table className="table table-striped">
                                     <tbody>
                                       {this.buildTable()}
                                     </tbody>
                                   </table>
                                  </div>
                                 :
                                 <div> No Portfolios Created </div>

    return (
          table
    )
  }
}


export default PortfolioList
