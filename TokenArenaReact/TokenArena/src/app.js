import React from "react"
import Header from "./components/static_components/Header"
import Carousel from "./components/static_components/Carousel"
import Arenas from "./components/Arenas/Arenas"
import Footer from "./components/static_components/Footer"
import About from "./components/static_components/About"
import Home from "./components/Home/Home"
import Register from "./components/RegisterPortfolio/Register"
import CreateArena from "./components/CreateArena/CreateArena"
import DataRoom from './components/DataRoom/DataRoom'
import { Route, Switch } from 'react-router-dom'
import { store } from "./store"


class App extends React.Component {

     /*
         Responsible for reading state and sending out state notification to components
         Register gets Info for User Portfolios
         Header gets User Context Info
         Home gets Arena Info
     */

    constructor(props){
      super(props)
      //for DEV only
      let user_info = store.getState().user
      // END DEV ONLY

      this.state = {
        display_register: false,
        user: user_info
      }
    }

    toggle_register = ()=> {
        this.setState({display_register: !this.state.display_register})
        //window.alert(this.state.display_register)
    }

    delegateUserToChildren = ()=> { //Gets called on login to rerender entire page with new context
        let user_info = store.getState().user
        this.setState(Object.assign({},{user: user_info}))
    }

    renderHome = ()=> {
      return(<Home user={this.state.user}/>)
    }

    logout = () => {

    }

    render(){

      return(
      <div>
        {this.state.display_register?
                            <div className="fixed right">
                              <Register toggleControl={this.toggle_register} />
                            </div>
                          : null}

            <div className="header fixed-top">
                <Header userHandler = {this.delegateUserToChildren}
                        toggle_handler = {this.toggle_register}
                />
            </div>
            <Switch>
              <Route exact path="/" render={this.renderHome}/>
              <Route exact path="/dataroom" component={DataRoom}/>
            </Switch>
        </div>
      )
    }

}

export default App
