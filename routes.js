const express = require('express');
const router = express.Router();
const Note = require('./models/note'); // Need to import model for mongo

// ------------  
router.get('/:id', async (req, res) => {// with <<:>> you can retrieve id from url
  
    try {
        const result = await Note.findById(req.params.id); //async and await for working with database

        if (result == null) {
            res.sendStatus(404); // not found
        } else {
            res.json(result); //sending text field in json if id is found
        }

    } catch (err) {
      res.sendStatus(400); // error
    }
  
});
  
// ------------ 
router.post('/', async (req, res) => {
  
    try {
        var now = new Date().toISOString().slice(0, 10);
        const note = new Note({date : now}); // Creating a blank(new) Note in Mongo
        const result = await note.save(); //Saving a note to database
  
        if (result == null) {
            res.sendStatus(404);
        } else {
            res.json(result._id);
        }
  
    } catch (err) {
      res.sendStatus(400);
    }
  
});
  
// ------------ 
router.patch('/:id', async (req, res) => {//For udpating a document
    
    try {
  
        const result = await Note.findByIdAndUpdate(req.params.id, {$set: req.body}); //Updating a document in Mongo
        
        if (result == null) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    
    } catch (err) {
        res.sendStatus(400);
    }
  
});


module.exports = router;