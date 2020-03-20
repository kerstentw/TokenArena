MongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectId
cols = require('./collections')
handler = require('./dbScripts')
hashlib = require('../utils/hashlib')

const db_name = process.env.DB_NAME
const db_url = process.env.DB_URL



/**

SIGN UP

**/

module.exports.signup = function(_user_obj,res){
    var stat = {"error" : "error_on_signup"}
    var unique = true

    MongoClient.connect(db_url, (error, client) => {
      options = {unique: true}

      try {
        var hashed_submitted_pass = hashlib.hashpassword(_user_obj.password)
        var auth_collection = client.db(db_name).collection(cols.USER_AUTH)
        var user_collection = client.db(db_name).collection(cols.USER_INFO)

      } catch (err) {
        stat = {"error" : "internal_db_error", "msg" : err}
        return
      }

      if (error) {
        stat = {"error" : "db_error", "msg":error}
      }

      auth_collection.findOne({email: _user_obj.email}, (err,document)=>{ //Implement Later: async/await
        if (document) {
          unique = false
        }

        if (unique === true) {
          auth_collection.insertOne(_user_obj, options, (err,document)=>{
            if (document && unique === true) {
              stat = {"msg" : "signup_success", "id" : document.insertedId}
              user_collection.insertOne(handler.createUser(document.insertedId,_user_obj.email))
            } else {
              stat = {"error" : "doc_id_error", "msg" : error || "unknown"}
            }
          })
        } else {
          stat = {"error" : "user_already_exists"}
        }

        res.json({data: stat}) //TODO: Build a better handler for this
      })
  })
}


/**

LOGIN

**/

module.exports.login = function(_user_obj, res) {

    var stat = {"error": "user_not_found" }
    MongoClient.connect(db_url, (error, client)=>{
      console.log(_user_obj)

      var auth_collection = client.db(db_name).collection(cols.USER_AUTH)
      var user_collection = client.db(db_name).collection(cols.USER_INFO)
      var folio_collection = client.db(db_name).collection(cols.PORTFOLIOS)
      var hashed_submitted_pass = hashlib.hashpassword(_user_obj.password)

      auth_collection.findOne({email: _user_obj.email}, (err, document)=>{
        if (err) {
          stat = {"error": err}
        }

        if (document) {
          if (document.password === hashed_submitted_pass){

                user_collection.findOne({email: _user_obj.email}).then( user_obj => {
                console.log("USER OBJ", user_obj)

                stat = {
                        "msg"  :       "login_success",
                        "id"    :       document._id,
                        "email" :       document.email,
                        "token" :       document.token,
                        "arenas":       user_obj.arenas,
                        "portfolios" :  user_obj.portfolios,
                        "wagers" :      user_obj.wagers,
                        "last_signin" : user_obj.last_signin
                       }

                user_collection.updateOne({user_id: document._id},{$set: {last_signin: new Date().toISOString()}})

                folio_collection.find({user_id: String(document._id)}).toArray(
                  (err, folio_array) => {
                    console.log("FOLIO ARRAY", document._id)
                    stat.portfolios = folio_array
                    res.json({data: stat})
                  }
                )

            })
          } else {
            stat = {"error" : "incorrect_password"}
            res.json({data: stat}) //TODO: Build a better handler for this
          }
        }
      })
  })

}


/**

CREATE_FOLIO

**/

module.exports.create_folio = function(_folio_obj, res){
    console.log("Create_Folio: ",Date())
    var stat = {"error":"error creating create_folio"}

    MongoClient.connect(db_url, (error, client)=>{
      console.log("\nGOT::: \n", _folio_obj)
      var folio_collection = client.db(db_name).collection(cols.PORTFOLIOS)
      var user_collection = client.db(db_name).collection(cols.USER_INFO)
      var insert_data = _folio_obj.data

      folio_collection.findOne({folio_name: _folio_obj.folio_name}, (err,document)=>{ //Implement Later: async/await
        if (document) {
          unique = false
          //TODO: More Validation Logic
        }



        let portfolio = handler.createPortfolio(
          _folio_obj.user_id,
          _folio_obj.folio_name,
          _folio_obj.asset_list,
          _folio_obj.type,
          _folio_obj.addr
        )

        console.log("\n\nATTMPT INSRT::: \n\n",portfolio)

        folio_collection.insertOne(portfolio, (err, document)=>{
            if (err) {
              stat = {"error": err}
            }



            //Create Portfolio
            // Add it to user collection

            if (document) {
              console.log("FOLIO OBJ USER ID::: ", _folio_obj.user_id)

              // CHECK REPEAT //

              user_collection.findOne({user_id: ObjectId(_folio_obj.user_id)},(err, docu) => {
                if (err) {console.log("ERROR",err)}
                else {
                  console.log("TEST DOCU",docu)
                }
              })

              // UPDATE COLLECTION //

              user_collection.update({user_id:  ObjectId(_folio_obj.user_id)},{$push: {portfolios: document.insertedId}}, (err, document) => {
                  if (err) {
                    console.log("UPDATE_ERR:: ", err)
                  }
                  console.log("doc UPDATE FOLIOs stat::: ", document.result)
                }
              )

                stat = {
                        "msg" : "create_folio_success",
                        "id" : document.insertedId
                       }
              }
              res.json({data: stat}) //TODO: Build a better handler for this

        })
      })
  })
}


var grab_all_arenas = (_res) => {
  return new Promise((resolve, reject) => {

  MongoClient.connect(db_url, (error, client)=>{

    var arena_collection = client.db(db_name).collection(cols.ARENAS)
      arena_collection.find({}, (err, cursor)=>{
          if (err) {
            reject(err)
          }
          var data = cursor.toArray()
          resolve(data)
      })
    })
  })
}


module.exports.all_arenas = (_res) => {
    grab_all_arenas().then(
      (arenas) => {
        _res.json({data: arenas})
      }
    )
}

module.exports.join_arena = (_away_obj, _res) => {
    var adjust = handler.joinArena(_away_obj)
    console.log("FOR ADJUSTMENT :::", _away_obj)
    console.log("ADJUSTING WITH", adjust)
    MongoClient.connect(db_url, (error, client) => {
        var arena_collection = client.db(db_name).collection(cols.ARENAS)
        arena_collection.updateOne({_id: ObjectId(_away_obj._id)},{$set: adjust},(err, document) => {
            if (err) {
              _res.json({error: {msg: "Error on Insert"}})
            }
            // returns update Arena List
            console.log("INSERT DOC::: ",document.result)
            grab_all_arenas().then( arenas => {
              _res.json({data: {arenas: arenas}})
            })
        })
    })

}


module.exports.get_user = (_user_id, _res) => {
    MongoClient.connect(db_url, (error, client)=>{
        var user_collection = client.db(db_name).collection(cols.USER_INFO)
        user_collection.findOne({user_id: ObjectId(_user_id)}, (err, document)=>{
          if (err) {
              _res.json({})
          }
          console.log("GET_USER QUERIED>::: ", document)
          _res.json({data: document})
        })
    })
}



module.exports.register_arena = (arena, _res) => {
  MongoClient.connect(db_url, (error, client)=>{
      var arena_collection = client.db(db_name).collection(cols.ARENAS)
      var validated_arena = handler.createArena(arena)

      arena_collection.insertOne(validated_arena, (err, document) => {
        if (err) {
          _res.json({data: {msg: err}})
        }

        grab_all_arenas().then(
          (arenas) => {
            _res.json({data: {arenas: arenas,
                              inserted: document.result
                             }
            })
          }
        )
      })
  })
}
