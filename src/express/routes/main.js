"use strict";

const { Router } = require(`express`);
const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.status(200).send(`/`));

module.exports = {
  mainRouter,
};
