import React from 'react'
import { connect } from 'react-redux'
import PortFolioList from '../RegisterPortfolio/PortfolioList'
import { store } from '../../store'
import { join_arena } from '../../actions/arena'

class JoinArena extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isValid: false,
      selectedFolio: null,
      form: this.props.arena
    }
  }

  updateFolioState = (_folio) => {
      this.setState(Object.assign({}, {form: {...this.state.form, away_portfolio: _folio}, isValid: true}))
  }

 submitJoin = ()=>{
   const { join_arena } = this.props
   join_arena({data: this.state.form})
 }

  componentDidMount = () => {

  }


  render = () => {

    console.log("FORMJOIN" , this.state.form)

    return (
      <div>
        <h1>Join Arena</h1>
        <PortFolioList
            folio_type = { this.props.folio_type}
            folio_data = {store.getState().user.portfolios}
            context="select"
            state_injector = {this.updateFolioState}
        />

        <button onClick= {this.props.close} className="btn btn-outline-danger">
            Cancel
        </button>

        <button disabled={ !this.state.isValid } onClick = {this.submitJoin} className="btn btn-outline-success">
            Join Arena
        </button>
      </div>
    )
  }
}

// Helpers
function mapStateToProps() {
    return {}
}

const actionCreators = {
    join_arena: join_arena
}

export default connect(
  mapStateToProps,
  actionCreators
)(JoinArena)
