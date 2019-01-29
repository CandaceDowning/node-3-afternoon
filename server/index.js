require('dotenv').config();
const express =  require('express');
const { json } = require('body-parser');
const session = require('express-session');
const { check } = require('./middlewares/checkForSession')
const { read } = require('./controllers/swag_controller');
const {login, register, signout, getUser} = require('./controllers/auth_controller')
const {add, remove, checkout} = require('./controllers/cart_controller')
const {get} = require('./controllers/search_controller')
let { SESSION_PORT } = process.env || 3666

const app = express()

app.use(json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//checks for a session in progress
app.use( check );
app.use(express.static(`${__dirname}/../build`))

//gets all products from the swag model within this folder
app.get(`/api/swag`, read)

//manages user session authorizations
app.post(`/api/login`, login)
app.post(`/api/register`, register)
app.post(`/api/signout`, signout)
app.get(`/api/user`, getUser)

//manages users cart
app.post(`/api/cart`, add)
app.post(`/api/cart/checkout`, checkout)
app.delete(`/api/cart`, remove)

//manages searches by category
app.get(`/api/search`, get)

app.listen(SESSION_PORT, ()=>{
    console.log(`listening on ${SESSION_PORT}`)
})