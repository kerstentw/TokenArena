hashlib = require("../utils/hashlib")
time_helpers = require("../utils/time")

// SCHEMAS //

module.exports.createUser = function(_id,_email){
    var user = new Object()

    user["user_id"] = _id
    user["email"] = _email
    user["arenas"] = new Array()
    user["portfolios"] = new Array()
    user["wagers"] = new Array()
    user["joined"] = new Date().toISOString()
    user["last_signin"] = new Date().toISOString()
    user["token"] = hashlib.genToken(user["last_signin"])

    return user
}


module.exports.createPortfolio = function(_user_id, _folio_name, _asset_list,_folio_type, _folio_addr){
      var portfolio = new Object()

      portfolio["type"] = _folio_type
      portfolio["user_id"] = _user_id
      portfolio["folio_name"] = _folio_name
      portfolio["asset_list"] = _asset_list

      if (portfolio.type === "live"){
        portfolio["addr"] = _folio_addr
      }

    return portfolio
}


module.exports.createArena = function(_arena){
     var arena = new Object()
     var creation_time = new Date().toUTCString()

     console.log("DB_SCRIPT::: ", _arena)

     let end_t = "" //generate endTime From time_offset

     arena["creation_t"] = creation_time
     arena["start_t"] = null
     arena["end_t"] = null
     arena["arena_name"] = _arena.name
     arena["home_portfolio"] = _arena.home_folio
     arena["away_portfolio"] = null
     arena["time_offset"] = _arena.increment
     arena["type"] = "pending"
     console.log("CREATED ARENA::: ", arena)

     return arena

}

module.exports.joinArena = (_away_obj) => {
    // '$set:' object created here
    var adjust = new Object()
    var start_t = new Date().toUTCString()
    var end_t = time_helpers.determine_endtime(start_t, _away_obj.time_offset)


    adjust["away_portfolio"] = _away_obj.away_portfolio
    adjust["start_t"] = start_t
    adjust["end_t"] = end_t
    adjust["type"] = "active"

    return adjust


}

// HELPERS //

module.exports.fetchUser = () => {

}
