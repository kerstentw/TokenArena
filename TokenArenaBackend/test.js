require('dotenv').config()
const cmc = require('./src/external/cmc_api')


cmc.get_and_stash_latest_prices()
