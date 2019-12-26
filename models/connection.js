const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/e-com";
mongoose.connect(url);
const db = mongoose.connection
console.log("Connectiion Done");    
module.exports = db;
