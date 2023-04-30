const express = require('express')
const conn = require('./database.js')
const userRouter = require('./modules/pages/user.js')
const app = express()
app.use(express.json())
//

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
// Proxy: http://127.0.0.1:5000/
app.listen(5000,()=>{console.log("Server started")})
