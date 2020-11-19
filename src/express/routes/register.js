"use strict";

const { Router } = require(`express`);
const registerRouter = new Router();

registerRouter.get(`/`, (req, res) => res.status(200).send(`/register`));

module.exports = {
  registerRouter,
};
