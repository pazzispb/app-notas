const express = require("express");
const body_parser = require("body-parser");
const path = require("path");
const pug = require("pug");

require('dotenv').config();

const Notes = require("./database");
const updateRouter = require("./update-router");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use("/updatepage", updateRouter);
app.use((req, res, next) => {
  console.log(req.method + " : " + req.url);
  next();
});

app.get("/", (req, res, next) => {
  res.redirect("/index");
});

app
  .route("/notes-add")
  .get((req, res, next) => {
    res.render("notes-add");
  })
  .post(async (req, res, next) => {
    console.log(req.body);
    const Note = new Notes({});

    Note.title = req.body.title;
    Note.description = req.body.description;
    //save notes first
    try {
      const product = await Note.save();
      console.log(product);
      res.redirect("/index");
    } catch(err) {
      console.log(err);
      next(err);
    }
  });


app.get("/index", async (req, res, next) => {
  try {
    const document = await Notes.find({}).exec();
    let Data = [];
    document.forEach((value) => {
      Data.push(value);
    });
    res.render("view", { data: Data });
  } catch (err) {
    console.log(err);
    next(err); // Pass the error to Express.js error handling middleware
  }
});

app.get("/delete/:__id", async (req, res, next) => {
  try {
    const document = await Notes.findByIdAndRemove(req.params.__id, { useFindAndModify: false });
    console.log(document);
    res.redirect("/index");
  } catch (err) {
    console.log(err);
    next(err);
  }
});


app.get("/updatepage/:__id", async (req, res) => {
  try {
    console.log("id for get request: " + req.params.__id);
    const document = await Notes.findById(req.params.__id);
    console.log(document);
    res.render("updatepage", { data: document });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


app.post("/updatepage", async (req, res, next) => {
  try {
    console.log("id: " + req.body.id);
    const document = await Notes.findByIdAndUpdate(
      req.body.id,
      { title: req.body.title, description: req.body.description },
      { useFindAndModify: false }
    );
    console.log("updated");
    res.redirect("/index");
  } catch (err) {
    console.log(err);
    next(err);
  }
});



const port = process.env.PORT;
console.log(port);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

