"use strict";

const { Router } = require(`express`);
const loginRouter = new Router();

loginRouter.get(`/`, (req, res) => res.status(200).send(`/login`));

module.exports = {
  loginRouter,
};
