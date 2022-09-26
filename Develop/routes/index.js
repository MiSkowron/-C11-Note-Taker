const express = require('express');
const noteRouter = require('./notes.js');

const app = express();

app.use('/notes', noteRouter);

module.exports = app;
