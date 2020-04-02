import React from 'react'

const initialState = {
  opened: []
}

class Accordion extends React.Component {

  constructor(props) {

    super()
    this.props = props
    this.state = initialState

    this.showBody = this.showBody.bind(this)
  }

  unwrapAccordion() {
    /*
     * data_obj: example -> [{label: "label", text: "text"},{...}]
     */

    let content_array = new Array()

    for (let i = 0; i < this.props.data_obj.length; i++) {
      // Faster than Array.map
      let content = this.props.data_obj[i]
      let show = this.state.opened.indexOf(i) > -1? true : false

      content_array.push(
        <div key={i}>
          <h1 onClick = {
            show?
            ()=>{this.hideBody(i)}
            :
            ()=>{this.showBody(i)}
          } >
            { content.label }
          </h1>
          { show? <p> { content.text } </p> : "" }
        </div>
      )
    }

    return content_array;
  }

  showBody (_idx) {

    this.setState((state)=>{
      let acc_array = Array.from(state.opened)
      acc_array.push(_idx)
      return {opened: acc_array}
    })
  }

  hideBody (_idx) {
    this.setState((state)=>{
      let acc_array = Array.from(state.opened)
      acc_array = acc_array.filter((entry) => {return entry != _idx})
      return {opened: acc_array}
    })
  }

  render = () => {
    return (
      <div>
        { this.unwrapAccordion() }
      </div>
    )
  }
}

export default Accordion
