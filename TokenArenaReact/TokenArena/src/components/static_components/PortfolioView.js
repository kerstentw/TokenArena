import React from 'react'

export default function PortfolioView(props){
    let formatted_assets = new Array()
    let asset_keys = Object.keys(props.portfolio.asset_list)

    for (let i = 0; i < asset_keys.length; i++){
        formatted_assets.push(
          <div>
              {asset_keys[i]} : {props.portfolio.asset_list[asset_keys[i]]}
          </div>
        )
    }
    console.log("Formatted Assets", formatted_assets)
    return (
      <div>
        <h1> {props.portfolio.folio_name} </h1>
        Portfolio ID: {props.portfolio.id}
        Portfolio Type: {props.portfolio.type}
        Porfolio Tokens: { formatted_assets }
      </div>
    )

}
