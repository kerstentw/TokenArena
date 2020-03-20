MongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectId
cols = require('./collections')


const db_name = process.env.DB_NAME
const db_url = process.env.DB_URL

module.exports.stash_prices = function(_price_obj){
    MongoClient.connect(db_url, (error, client)=>{
        var price_collection = client.db(db_name).collection(cols.PRICES)
        price_collection.insertOne(_price_obj, (err, document) => {
            if (err) {

            }

            if (document) {
              return document
            }
        })
    })
}
