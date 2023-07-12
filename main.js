const express = require("express");
const path = require("path");
const pug = require("pug");
const axios = require("axios");
const { graphqlHTTP } = require("express-graphql");

require("dotenv").config();

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.method + " : " + req.url);
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.get("/", (req, res, next) => {
  res.redirect("/index");
});

app.route("/notes-add").get((req, res, next) => {
  res.render("notes-add");
});

app.post("/notes-add", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const response = await axios.post("http://localhost:3000/graphql", {
      query: `
        mutation {
          addNote(title: "${title}", description: "${description}") {
            id
            title
            description
          }
        }
      `,
    });
    console.log(response.data);
    res.redirect("/index");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get("/index", async (req, res, next) => {
  try {
    const response = await axios.post("http://localhost:3000/graphql", {
      query: `
        {
          getAllNotes {
            id
            title
            description
          }
        }
      `,
    });
    res.render("view", { data: response.data.data.getAllNotes });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get("/delete/:__id", async (req, res, next) => {
  try {
    const { __id } = req.params;
    const response = await axios.post("http://localhost:3000/graphql", {
      query: `
        mutation {
          deleteNote (id: "${__id}") {
            id
          }
        }
      `,
    });
    console.log(response.data);
    res.redirect("/index");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get("/updatepage/:__id", async (req, res) => {
  try {
    const { __id } = req.params;
    const response = await axios.post("http://localhost:3000/graphql", {
      query: `
        {
          getNoteById (id: "${__id}") {
            id
            title
            description
          }
        }
      `,
    });
    console.log(response.data);
    res.render("updatepage", { data: response.data.data.getNoteById });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/updatepage/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const response = await axios.post("http://localhost:3000/graphql", {
      query: `
        mutation {
          updateNote (id: "${id}", title: "${title}", description: "${description}") {
            id
            title
            description
          }
        }
      `,
    });
    console.log('el id es:' + id)
    console.log(response.data);
    res.redirect("/index");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
