const express = require('express')
const conn = require('../../database.js')

const slotRouter = express.Router();
//, isAuthenticatedFunction
slotRouter.get('/:trainer_id', (req,res) => {
  let sql = 'SELECT * FROM free_slot WHERE trainer_id = ?;';
  conn.query(sql, [req.params.trainer_id], function(err, result){
    if (err) {
      console.error(err);
      return;
    }
    res.send({"slot": result})
  })
});
slotRouter.post('/', (req,res) => {
  const freeslot = req.body;
  let sql = 'INSERT into free_slot (trainer_id, classes, weekday, date, from_time, to_time) VALUES (?);';
  conn.query(sql, [freeslot], function(err, result){
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error inserting data' });
    }
    return res.status(200).json({ message: 'Votre demande est bien transmise' });
  })
});
slotRouter.post('/1/:id', (req,res) => {
  const updateSlot = req.body;
  const theDate = updateSlot.date !== null ? updateSlot.date.slice(0,10) : updateSlot.date;
  const weekd = updateSlot.weekday !== null ? updateSlot.weekday : null
  let sql = 'UPDATE free_slot SET classes = ?, weekday = ?, date = ?, from_time = ?, to_time = ? WHERE id = ?';
  conn.query(sql, [updateSlot.classes, weekd, theDate, updateSlot.from_time, updateSlot.to_time, req.params.id], function(err, result){
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error inserting data' });
    }
    return res.status(200).json({ message: 'Update done' });
  })
});
slotRouter.post('/1/delete/:id', (req,res) => {
  const updateSlot = req.body;
  console.log(updateSlot)
  let sql = 'DELETE FROM free_slot WHERE id = ?';
  conn.query(sql, [req.params.id], function(err, result){
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error inserting data' });
    }
    return res.status(200).json({ message: 'La demande est supprimée' });
  })
});
module.exports = slotRouter;