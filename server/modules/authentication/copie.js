



const express = require('express')
const session = require('express-session')
const conn = require('../../database.js')
const passport =require('passport')
const bcrypt =require('bcrypt')
const flash =require('connect-flash')
const cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv')
dotenv.config()


const loginRouter = express.Router();
loginRouter.use(flash())
loginRouter.use(cookieParser());
loginRouter.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://127.0.0.1:5000/");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
//, isAuthenticatedFunction
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
        if(!rows.length){
            return done(null, false, req.flash('message','Adresse éléctronique ou mot de passe est invalid'));
        }
        // password from db and password from login form are toString()
        if(!bcrypt.compareSync(password.toString(), rows[0].password.toString())){
            return done(null, false, req.flash('message',"Le mot de passe saisi n\'est pas correcte"));
        }
        if(rows[0].reg_verification === "NO" && req.body.first_conn){
            updateRegVerification(req.body.first_conn);
        return done(null, rows[0]);
        }
        if(rows[0].reg_verification === "YES"){return done(null, rows[0]);}
        if(rows[0].reg_verification === "NO" && req.body.first_conn === undefined){
            return done(null, false, req.flash('message','Consultez votre boite éléctronique et suivez les instructions afin de confirmer votre inscription.'));
        }
    })
    }
));
passport.serializeUser(function(user, cb) {
process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
});
});
passport.deserializeUser(function(user, cb) {
process.nextTick(function() {
    return cb(null, user);
});
});
// END Password
loginRouter.post("/", passport.authenticate('local', {
    failureFlash: true
}), function(req, res) {
    console.log(req)
    console.log(req.cookies)
    console.log('Signed Cookies: ', req.signedCookies)
    const cookies = req.cookies || {};
    const sessionId = cookies['connect.sid'];
    
    if (sessionId) {
      const response = {
        sessionId: sessionId
    };
    console.log(response)
      // Send the response object to the React component
      res.json(response);
    } else {
      // Handle the case when the desired cookie is not present
      console.error('Session cookie not found');
      res.status(400).json({ error: 'Session cookie not found' });
    }
});
/*
loginRouter.post("/", passport.authenticate('local', {
    failureFlash: true
}), function(req, res, info){
    console.log(res._server.client)
});
*/
module.exports = loginRouter;
/*
loginRouter.post('/', (req,res) => {
    const authBody = req.body;
    console.log(authBody)
    let sql = 'SELECT * FROM users where email = ?;';
    conn.query(sql, [authBody.email], function(err, result){
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error during authentication' });
        }

        return res.status(200).json({ message: 'Credentials are ok' });
    })
});
*/