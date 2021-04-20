const express = require('express');
const mongoose = require('mongoose');
const api = require('./routes'); //Separate file for routes

const app = express();

let conn = process.env.ATLAS; // settings on heroku base browser, mongo atlas is a mongo cloud server
if (conn == null || conn == "") { // lets setting mongo on production and development
  conn = 'mongodb://localhost:27017/notebook';
}

mongoose.connect(conn, { //Arguments for Atlas
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: 'notebook'// required for Atlas database
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to mongo'));

app.use(express.json()); // For sending and recieving data in json
app.use(express.static('public')); // Needed to serve front end to user
app.use('/api', api);
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));// For catching everything else but /api, sends index.html(front end)

let port = process.env.PORT; // Allows to connect on Atlas
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => console.log("Server is listening on port %s", port));
