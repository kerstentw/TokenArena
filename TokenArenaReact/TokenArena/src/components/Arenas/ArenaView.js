import React from 'react'
import { get_user } from '../../actions/user'
// Prop Driven Dumb Component
// Will connect to Socket Service


class ArenaView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () =>{
    this.render_portfolio(this.props.arena.home_portfolio)
  }

  render_assets = (_asset_obj) => {
      let keys = Object.keys(_asset_obj || {})
      let asset_jsx = []

      for (let i = 0; i < keys.length; i++){
          asset_jsx.push(
            <div>
              {keys[i]} : {_asset_obj[keys[i]]}
            </div>
          )
      }
      return asset_jsx
  }

  render_portfolio = (_portfolio) => {
    if (!_portfolio){
      return null
    }

    var page = ""

    get_user(_portfolio.user_id).then((info)=>{
      console.log("HOME USER::: ",info)

      page =
        <div>
          {_portfolio.folio_name}
          <h3>Tokens</h3>
          {this.render_assets(_portfolio.asset_list)}
        </div>

      this.setState(Object.assign({home_portfolio: page}))
    })

  }

  render(){
    return(
       <div>
         <h2>
            {this.props.arena.arena_name}
            <div>
              <h3> Home Portfolio </h3>
              {this.state.home_portfolio}
            </div>
         </h2>

       </div>
    )
  }
}

export default ArenaView
