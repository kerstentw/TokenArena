const req_promise = require('request-promise')
const db_client = require('../db/externalMongoHandler')
const divide_and_stash_cmc_data = require('../utils/db_helpers').divide_and_stash_cmc_data

const LIMIT = 2050

const ENDPOINT = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"

const listingOptions = {
  method: 'GET',
  uri: ENDPOINT,
  qs: {
    start: 1,
    limit: LIMIT,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY' : process.env.CMC_KEY
  },
  json: true,
  gzip: true
}

module.exports.get_and_stash_latest_prices = function(){
    console.log("REQUESTING...")
    req_promise(listingOptions).then(resp => {
        divide_and_stash_cmc_data(resp, db_client.stash_prices)
    }).catch(err =>{
      console.log("ERR ", err)
    })
}
