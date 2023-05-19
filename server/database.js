const mysql = require('mysql2')
const dotenv = require('dotenv').config()
//
const conn = mysql.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  multipleStatements: true,
  timezone: '+01:00' 
});
conn.config.timezone = 'Z';
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;