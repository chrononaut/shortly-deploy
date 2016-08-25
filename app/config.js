var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shortlydb');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  console.log('connected to DB');
});

var Urls = new mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

var Users = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  timestamp: Date
});

exports.Urls = Urls;
exports.Users = Users;
exports.db = db;
