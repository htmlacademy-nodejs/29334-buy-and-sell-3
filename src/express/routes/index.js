"use strict";

const { mainRouter } = require(`./main`);
const { loginRouter } = require(`./login`);
const { myRouter } = require(`./my`);
const { offersRouter } = require(`./offers`);
const { registerRouter } = require(`./register`);
const { searchRouter } = require(`./search`);

module.exports = {
  mainRouter,
  loginRouter,
  myRouter,
  offersRouter,
  registerRouter,
  searchRouter,
};
