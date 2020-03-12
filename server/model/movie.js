const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
     name:String,
     category:String,
     imdbLink:String,
     img:String,
     date:Date
})
module.exports = mongoose.model('movies', movieSchema)