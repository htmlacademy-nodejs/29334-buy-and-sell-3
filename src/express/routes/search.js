"use strict";

const { Router } = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, (req, res) => res.status(200).send(`/search`));

module.exports = {
  searchRouter,
};
