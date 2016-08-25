var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('baseUrl', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});
// var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/shortlydb');

// var db = mongoose.connection;

// db.on('error', console.error);
// db.once('open', function() {
//   console.log('connected.');
// });

// var Urls = new mongoose.Schema({
//   url: String,
//   baseUrl: String,
//   code: String,
//   title: String,
//   visits: { type: Number, default: 0 },
//   timestamp: { type: Date, default: Date.now }
// });

// var Users = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true
//   },
//   password: String,
//   timestamp: Date
// });

// exports.Urls = Urls;
// exports.Users = Users;
// exports.db = db;
module.exports = db;
