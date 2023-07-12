const { buildSchema } = require('graphql');
const Notes = require('./db/database');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    getNoteByID(id: String!): Note
    getAllNotes: [Note]
  }

  type Mutation {
    addNote(title: String!, description: String!): Note
    deleteNoteByID(id: String!): String
    updateNoteByID(id: String!, title: String, description: String): Note
  }

  type Note {
    id: String
    title: String
    description: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  getNoteByID: async ({ id }) => {
    return await Notes.findById(id);
  },
  getAllNotes: async () => {
    return await Notes.find({});
  },
  addNote: async ({ title, description }) => {
    let newNote = new Notes({ title, description });
    return await newNote.save();
  },
  deleteNoteByID: async ({ id }) => {
    await Notes.findByIdAndRemove(id);
    return id;
  },
  updateNoteByID: async ({ id, title, description }) => {
    let updatedNote = await Notes.findByIdAndUpdate(id, { title, description }, { new: true });
    return updatedNote;
  }
};

module.exports = {
  schema: schema,
  root: root
};
