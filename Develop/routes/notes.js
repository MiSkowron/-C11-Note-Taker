const note = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile, writeToFile } = require("../helpers/fsUtils");
const db = require('../db/db.json');

// GET Route for retrieving all the notes
note.get("/", (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
note.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

module.exports = note;
