import React from "react"
import "./arenas.css"
import CreateArena from '../CreateArena/CreateArena'
import Popup from 'reactjs-popup'
import testArenas from './testArenas'
import JoinArena from '../JoinArena/JoinArena'
import ArenaView from './ArenaView'

class Arenas extends React.Component {
  constructor(props){
    super(props)
  //  this.table_name = props.name
    this.state = {
      test_data: props.arenas
    }
  }

  renderJoinButton = (_this_arena) => {
    return (
      <Popup
        trigger = { <td>
                      <button className="btn-sm btn-outline-info">
                        {this.props.type === "pending"? "join" : "wager"}
                      </button>
                    </td>
                  }
        modal
      >
        { close => <JoinArena
                       folio_type={ this.props.folio_type }
                       close={close}
                       arena = {_this_arena}
                   />
        }
      </Popup>
    )
  }

  generateRows = () => {
    var rows = []

    for (let i = 0; i < Object.keys(this.props.arenas).length; i++) {
      if (this.props.arenas[i].type !== this.props.type ||
          this.props.folio_type !== this.props.arenas[i].home_portfolio.type
         ) {
             continue
           }

      var cls_mod = (i % 2 == 0)? "row" : "";

      rows.push(
          <tr className="{cls_mod}" id={this.props.arenas[i].id}>
            <td>
              <Popup trigger = {
                         <div  className="arenaName" href = {`arena/${this.props.arenas[i].id}`}>
                           { this.props.arenas[i].arena_name}
                         </div>
                     }
                     modal
              >
                  <ArenaView arena={this.props.arenas[i]}/>
              </Popup>
            </td>
            <td>{this.props.arenas[i].home_portfolio.folio_name}</td>
            <td>{this.props.arenas[i].time_offset}</td>
            <td>{this.props.arenas[i].creation_t}</td>
            { this.props.user_state.id? this.renderJoinButton(this.props.arenas[i]) : null}
          </tr>
       )
    }

    return rows

  }

  render(){
    console.log("ARENA::: ", this.props.type)
    console.log("ARENAS FROM PROPS: ", this.props.arenas)

    var button = this.props.button &&
                 this.props.user_state.id != null ?
                     <Popup
                        trigger = {
                                   <button className="btn btn-md btn-outline-danger float-right">
                                     {this.props.button}
                                   </button>
                                  }
                        modal
                        closeOnDocumentClick
                     >
                       {close => (<CreateArena folio_type = {this.props.folio_type} handler={close} />)}
                     </Popup>
                   : null

    return(

        <div className="arenas container">
          <div className="card bg-light mb-3">
            <div className="card-header">
              <h2>{this.props.name}</h2>
              {button}
            </div>
              <div className="arena-card card-body">
                <table  className="table table-striped">
                  <tbody>
                    <tr>
                      <th> Arena Name </th>
                      <th> Home Portfolio </th>
                      <th> Lifespan </th>
                      <th> Created At </th>
                      <th></th>
                    </tr>
                    { this.generateRows() }
                  </tbody>
                </table>

              </div>
            </div>
        </div>

    )
  }

}

export default Arenas
