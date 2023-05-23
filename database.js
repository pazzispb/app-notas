const mongooseClient = require("mongoose");

mongooseClient.connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log('Cannot connect to MongoDB', err);
    else console.log('Connected to MongoDB');
  } 
);


const NotesSchema = mongooseClient.Schema({
  title: String,
  description: String,
});

const Notes = mongooseClient.model("Notes", NotesSchema);

module.exports = Notes;
