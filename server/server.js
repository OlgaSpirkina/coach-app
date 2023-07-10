const express = require('express')
// Authentication & Cookies
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const conn = require('./database.js')
const dotenv = require('dotenv')
const bcrypt =require('bcrypt')
const cors = require('cors')
const bodyParser = require('body-parser')
const modifyDateAndTime = require('./modules/functions/dateAndTime.js')
// API end-points
const companiesRouter = require('./modules/pages/companies.js')
const dashboardRouter = require('./modules/pages/dashboard.js')
const slotRouter = require('./modules/pages/slot.js')
//
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.options("*", cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(flash())
dotenv.config()
// Session 
const d = new Date();
// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  }
}));
app.use(passport.initialize());
app.use(passport.session());
//expires: new Date(Date.now() + 3600000)
passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true //passback entire req to call back
} , function (req, username, password, done){
      if(!username || !password ) {
          return done(null, false, req.flash('message','All fields are required.'));
      }
      conn.query("select * from users where email = ?", [username], function(err, rows){
          if (err) return done(req.flash('error message: ',err));
          if ((!rows.length) || (!bcrypt.compareSync(password.toString(), rows[0].password.toString()))) {
            return done(null, false, { statusCode: 404, message: "Adresse éléctronique ou mot de passe n'est pas invalide." });
          }
          if(rows[0].reg_verification === "NO" && req.body.first_conn){
              return done(null, rows[0]);
          }
          if(rows[0].reg_verification === "YES"){return done(null, rows[0]);}
          if(rows[0].reg_verification === "NO" && req.body.first_conn === undefined){
              return done(null, false, { statusCode: 403, message: 'Consultez votre boite éléctronique et suivez les instructions afin de confirmer votre inscription.' });
          }
      })
  }
));
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    try {
      const serializedUser = { id: user.id, username: user.username };
      console.log("in SERialise")
      console.log(serializedUser)
      cb(null, serializedUser);
    } catch (err) {
      cb(err); // Pass the error to cb
    }
  });
});
passport.deserializeUser(function(serializedUser, cb) {
  const userId = serializedUser.id;
  conn.query("SELECT * FROM users WHERE id = ?", [userId], function(err, rows) {
    if (err) {
      return cb(err);
    }

    if (rows.length === 0) {
      console.log("User not found");
      return cb(null, false);
    }

    const user = rows[0];
    cb(null, user);
  });
});
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

// END Password
app.post("/login", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.error("Passport authentication error:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (user) {
      req.login(user, function(err) {
        if (err) {
          console.error("Passport login error:", err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Set a cookie
        res.cookie('token_auth', req.sessionID, {
          secure: true,    // Ensure the cookie is only transmitted over HTTPS
          httpOnly: true,  // Restrict access to the cookie from client-side JavaScript
        });
        res.status(200).json({ success: true });
      });
    } else {
      const statusCode = info && info.statusCode ? info.statusCode : 401;
      const message = info && info.message ? info.message : 'Unauthorized';
      return res.status(statusCode).json({ error: message });
    }
  })(req, res, next);
});


app.use(function(err, req, res, next) {
if (err) {
  console.log("ERROR:", err);
  if (err.statusCode && err.message) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
} else {
  next();
}
});

app.get('/user', isAuthenticated, (req,res,next) => {
  
  console.log("from user")
  const serializedUser = req.user;
  console.log(req.user.id)
  let sql = 'SELECT * FROM timetable WHERE trainer_id=1 ORDER BY choose_month DESC;';
  conn.query(sql, function(err, result){
    if (err) {
      console.error(err);
      return;
    }
    res.send({"timetable": result})
  })
});
// Daily planning is get using query parameters: YYYY-MM-DD 
app.get('/user/planning', isAuthenticated, (req,res,next) => {
  console.log("from user")
  console.log(req.user.id)
  const day = (req.query.day <= 9) ? `0${req.query.day}` : req.query.day;
  const month = (req.query.month <= 9) ? `0${req.query.month}` : req.query.month;
  //
  let sql = 'SELECT * FROM timetable WHERE trainer_id=1 AND date = ? ORDER BY date;';
  conn.query(sql, [`${req.query.year}-${month}-${day}`], function(err, result){
    if (err) {
      console.error(err);
      return;
    }
    res.send({"daily_planning": modifyDateAndTime(result)})
  })
});
// Monthly planning is get using month index, this is not the new Date().getMonth() index but an index where January is a 1st month
app.get('/user/:monthid', isAuthenticated, (req,res,next) => {
  
  console.log("from user")
  console.log(req.user.id)
  let sql = 'SELECT * FROM timetable WHERE trainer_id=1 AND choose_month = ? ORDER BY date;';
  conn.query(sql, [req.params.monthid], function(err, result){
    if (err) {
      console.error(err);
      return;
    }
    res.send({"month": modifyDateAndTime(result)})
  })
});
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

app.use('/companies', companiesRouter)
app.use('/dashboard', dashboardRouter)
app.use('/slot', slotRouter)
// Proxy: http://127.0.0.1:5000/
app.listen(5000,()=>{console.log("Server started")})
