const express = require('express')
const conn = require('../../database.js')
const dashboardRouter = express.Router()
const modifyDateAndTime = require('../functions/dateAndTime.js')

// Find current date
const currentDate = new Date();
const day = (currentDate.getDate() <= 9) ? `0${currentDate.getDate()}` : currentDate.getDate();
const month = (currentDate.getMonth()+1 <= 9) ? `0${currentDate.getMonth()+1}` : currentDate.getMonth()+1;
const today = `${parseInt(new Date().getFullYear())}-${month}-${day}`;
// Find tomorrow date
const tomorrowDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
const tomorrowDay = (tomorrowDate.getDate() <= 9) ? `0${tomorrowDate.getDate()}` : tomorrowDate.getDate();
const tomorrowMonth = (tomorrowDate.getMonth()+1 <= 9) ? `0${tomorrowDate.getMonth()+1}` : tomorrowDate.getMonth()+1;
const tomorrowYear = tomorrowDate.getFullYear();
const tomorrow = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;
const twoDaysList = [today, tomorrow];
dashboardRouter.get('/', (req,res,next) => {
    const placeholders = twoDaysList.map(() => '?').join(', ');
    let sql = `SELECT * FROM timetable WHERE trainer_id = 1 AND date IN (${placeholders});`;
    conn.query(sql, twoDaysList, function(err, result){
        if (err) {
            console.error(err);
            return;
        }
        const correctDateAndTime = modifyDateAndTime(result);
        const tabletoday = correctDateAndTime.filter(item => item.date === today);
        const tabletomorrow = correctDateAndTime.filter(item => item.date === tomorrow);
        res.send({"dashboard": {today: tabletoday, tomorrow: tabletomorrow}});
    });
});
  
module.exports = dashboardRouter;