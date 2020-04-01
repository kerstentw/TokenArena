require('dotenv').config()
let cors = require('cors')
var express = require('express')
var app = express();
var db_client = require('./src/db/mongoClient')
var hashlib = require('./src/utils/hashlib')

// Grab From Application Variable

const PORT = process.env.PORT

//Setting Middleware


app.use(express.json())
app.use(express.urlencoded())

app.use((req,res,next) => {
    res.setHeader('Content-Type','application/json');
    next();
})

app.use(cors())

// RESTFUL Endpoints

app.get("/", (req,res) => {
  res.json({"msg":"Token Invalid"})
})

// to-do: Place into Restful App eps

/*
 * GET Endpoints
 */

// ALL ARENAS
app.get("/arenas", (req,res)=>{
  //TODO: Create Arena Schema
  //TODO: Build Arena Handler
    db_client.all_arenas(res)
})


// Get Season Info
app.get("/season_info", (req,res)=>{

})

/*
 * POST Endpoints
 */

// SIGNUP
app.post("/signup", (req,res) => {
  let signup_obj = new Object();
  let stat = db_client.signup(signup_obj.data, res)
  //res.json(stat)
})


// POST LOGIN
app.post("/login", (req,res) => {

  console.log("LOGIN",req.body)
  let login_obj = new Object(req.body.data);
  let stat = db_client.login(login_obj,res)

})


// GET USER
app.post("/getuser/:id", (req,res) => {
  console.log("REG PORT")
  var id = req.params.id
  res.json({"msg":"Token Invalid"})
})


//CREATE PORTFOLIO

app.post("/register_portfolio", (req, res) => {
    console.log("REG PORT")
    let folio_obj = new Object(req.body.data)
    db_client.create_folio(folio_obj, res)
})

//CREATE ARENA

app.post("/register_arena", (req,res)=>{
    console.log("REG_ARENA", req.body.data)
    db_client.register_arena(req.body.data, res)
})


app.post("/join_arena", (req,res) => {
    db_client.join_arena(req.body.data, res)
})

// Specific ARENA

app.post("/get_user", (req,res)=>{
    console.log("GET_USER_GOT::: ", req.body.data)
    db_client.get_user(req.body.data, res)

})



// Turning on Server

console.log("Server Listening On: ", PORT)
app.listen(PORT);
