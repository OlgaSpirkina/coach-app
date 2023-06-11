const express = require('express')
const conn = require('../../database.js')
const passport =require('passport')
const bcrypt =require('bcrypt')
const flash =require('connect-flash')
const cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local').Strategy;

const loginRouter = express.Router();
loginRouter.use(passport.authenticate('session'));
loginRouter.use(cookieParser());
loginRouter.use(flash())
loginRouter.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://127.0.0.1:5000/login");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //passback entire req to call back
  } , function (req, email, password, done){
        if(!email || !password ) {
            return done(null, false, req.flash('message','All fields are required.'));
        }
        conn.query("select * from users where email = ?", [email], function(err, rows){
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
        cb(null, { id: user.id, username: user.username });
      } catch (err) {
        cb(err); // Pass the error to cb
      }
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      try {
        cb(null, user);
      } catch (err) {
        cb(err); // Pass the error to cb
      }
    });
  });
  loginRouter.use(passport.initialize());
  loginRouter.use(passport.session());
// END Password

loginRouter.post("/", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      console.error("Passport authentication error:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (user) {
      // Set a cookie
      res.cookie('authToken', req.sessionID, {
        secure: true,    // Ensure the cookie is only transmitted over HTTPS
        httpOnly: true,  // Restrict access to the cookie from client-side JavaScript
      });
      res.status(200).json({ success: true });
    
    } else {
      const statusCode = info && info.statusCode ? info.statusCode : 401;
      const message = info && info.message ? info.message : 'Unauthorized';

      // Set the response headers to allow CORS
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

      return res.status(statusCode).json({ error: message });
    }
    
  })(req, res, next);
});

loginRouter.use(function(err, req, res, next) {
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
module.exports = loginRouter;




















































