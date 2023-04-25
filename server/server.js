const express = require('express')
const conn = require('./database.js')
const app = express()
app.use(express.json())
//
app.post("/api",(req,res)=>{
  let sql = 'SELECT * FROM trainers where email = ?;'
  conn.query(sql, [req.body.email], function(err, result){
    if(err) throw err;
    res.send({"trainers": result})
  }) 
})
// Proxy: http://127.0.0.1:5000/
app.listen(5000,()=>{console.log("Server started")})
