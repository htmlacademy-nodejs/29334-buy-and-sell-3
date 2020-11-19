"use strict";
const PORT = 8080;

const express = require(`express`);
const {
  mainRouter,
  myRouter,
  loginRouter,
  offersRouter,
  registerRouter,
  searchRouter,
} = require(`./routes/index`);

const app = express();
app.listen(PORT);

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/login`, loginRouter);
app.use(`/offers`, offersRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);
