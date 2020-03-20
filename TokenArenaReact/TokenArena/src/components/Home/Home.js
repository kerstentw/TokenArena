import React from "react"
import Header from "../static_components/Header"
import Carousel from "../static_components/Carousel"
import Arenas from "../Arenas/Arenas"
import Footer from "../static_components/Footer"
import About from "../static_components/About"
import Register from "../RegisterPortfolio/Register"
import { connect } from 'react-redux'
import { fetch_all_arenas } from '../../actions/arena'
import { store } from "../../store"

var temp_text = "Hodling doesn't have to be boring.  Token Arena is a competative game that turns your portfolio into a weapon.  Compete for the highest priced basket of assets in a token arena of your making.  Or, if you are up to it, join someone else's arena as a challenger.  After a set amount of time passes, the owner of the highest priced portfolio wins.  Check the season for the opportunity to add obscure or strange tokens to your portfolio for bonuses that just may tip the scales of your match.  If you are just looking to test your trading mettle against others you can also use our data room to set up fantasy portfolios for the chance to win renown as a top token trader."


class Home extends React.Component {

    constructor(props){

      super(props)
      this.state = {
        display_register: false,
        user_state: this.props.user,
        arenas: store.getState().arena
      }
    }

    reMountUser = ()=> {
        let store_state = store.getState()
        this.setState({user_state: store_state.user})
    }

    toggle_register = ()=> {
        this.setState({display_register: !this.state.display_register})
    }

    fetch_arenas = () => {
      const { fetch_all_arenas } = this.props
      fetch_all_arenas()
    }

    componentDidMount = () => {
        this.fetch_arenas() //Hydrates the arena listing
    }

    render(){
      var arenas = store.getState().arena
      console.log("ARENAS FROM STORE IN PARENT::: ", arenas)

      return(
        <div>

        <div className="mainAppContainer">

            <Carousel />
            <div>
            </div>
            <div className="aboutContainer">
              <About header = "About" text = {temp_text}/>
            </div>
            <div id="arenas" className="arena-view">

              <Arenas name = "Pending Live-Net Arenas"
                      user_state= {this.props.user}
                      button = "CREATE ARENA"
                      folio_type = "live"
                      type = "pending"
                      arenas = { arenas }
              />


              <Arenas name = "Active Live-net Arenas"
                      user_state= {this.props.user}
                      button = ""
                      type = "active"
                      folio_type = "active"
                      arenas = { arenas }
              />


              <Arenas name = "Pending Custom Arenas"
                      user_state= {this.props.user}
                      button = "CREATE ARENA"
                      folio_type = "mock"
                      type = "pending"
                      arenas = { arenas }
              />



              <Arenas name = "Active Custom Arenas"
                      user_state= {this.props.user}
                      button = ""
                      type = "active"
                      folio_type = "mock"
                      arenas = { arenas }
              />

            </div>
            <Footer />
          </div>
        </div>
      )
    }

}


export function mapStateToProps(store){
  return {
    arenas: store.arena
  }
}

const actionCreators = {
  fetch_all_arenas: fetch_all_arenas
}



export default connect(mapStateToProps, actionCreators)(Home)
