const express = require('express')
const conn = require('../../database.js')
const companiesRouter = express.Router();

companiesRouter.get('/', (req,res,next) => {
  let sql = 'SELECT * FROM entreprises;';
  conn.query(sql, function(err, result){
    if (err) {
        console.error(err);
        return;
    }
    let object = {};
    result.forEach((company)=>{
        if(!object[parseInt(company.id,10)]){
            object[parseInt(company.id,10)] = company.company_name
        }
    })
    res.send({"companies": object})
  })
});
companiesRouter.get('/sites', (req,res,next) => {
    let sql = 'SELECT id, site_name FROM company_details;';
    conn.query(sql, function(err, result){
        if (err) {
            console.error(err);
            return;
        }
        let sites = {};
        result.forEach((site)=>{
            if(!sites[site.id]){
                sites[site.id] = site.site_name
            }
        })
        res.send({"sites": sites})
    })
});
module.exports = companiesRouter;