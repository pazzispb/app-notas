const mongooseClient = require("mongoose");
require('dotenv').config();


const cn = process.env.DB_CONNECTION_STRING
console.log(cn);

mongooseClient.connect(cn, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Additional code or logic after successful connection
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


const NotesSchema = mongooseClient.Schema({
  title: String,
  description: String,
});

const Notes = mongooseClient.model("Notes", NotesSchema);

module.exports = Notes;