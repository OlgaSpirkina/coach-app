const express = require('express')
// Authentication & Cookies
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const conn = require('./database.js')
const dotenv = require('dotenv')
// API end-points
const userRouter = require('./modules/pages/user.js')
const companiesRouter = require('./modules/pages/companies.js')
const dashboardRouter = require('./modules/pages/dashboard.js')
const slotRouter = require('./modules/pages/slot.js')
const loginRouter = require('./modules/authentication/login.js')
//
const app = express()
app.use(cookieParser())
app.use(express.json())
dotenv.config()
//
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: false,
    maxAge: 3600000
  }
}));
//expires: new Date(Date.now() + 3600000)
app.use(passport.authenticate('session'));
app.use(flash())
app.get("/api/trainers",(req,res)=>{
  let sql = 'SELECT * FROM trainers ORDER BY fname;'
  conn.query(sql, function(err, result){
    if(err) throw err;
    console.log(result)
    res.send({"trainers": result})
  }) 
})
app.get("/api/trainers/:id",(req,res)=>{
  const id = req.params.id;
  let sql = 'SELECT * FROM trainers WHERE id = ?;'
  conn.query(sql, [id], function(err, result){
    if(err) throw err;
    console.log(result)
    res.send({"trainers": result})
  }) 
})
app.post("/api",(req,res)=>{
  let sql = 'SELECT * FROM trainers where email = ?;'
  conn.query(sql, [req.body.email], function(err, result){
    if(err) throw err;
    res.send({"trainers": result})
  }) 
})
app.use('/user', userRouter)
app.use('/companies', companiesRouter)
app.use('/dashboard', dashboardRouter)
app.use('/slot', slotRouter)
app.use('/login', loginRouter);
// Proxy: http://127.0.0.1:5000/
app.listen(5000,()=>{console.log("Server started")})
