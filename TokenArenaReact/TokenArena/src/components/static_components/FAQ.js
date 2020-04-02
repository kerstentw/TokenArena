import React from 'react'
import Accordion from './Accordion'

function FAQ (props) {
    const TEST_DATA = [
      {
        label: "What is Token Arena",
        text: "Token Arena is a HODL game for people holding on to tokens."
      },
      {
        label: "Do I need Metamask or another wallet to use token Arena?",
        text: "No, Token Arena has its own wallet system built in."
      },
      {
        label: "What tokens are supported in Token Arena?",
        text: "Token Arena is built to support ETH, WBTC, and other ERC20's"
      }
    ]

    return (
      <div>
        <h1>Frequently Asked Questions</h1>
        <Accordion data_obj={TEST_DATA}></Accordion>
      </div>

    )

}

export default FAQ
