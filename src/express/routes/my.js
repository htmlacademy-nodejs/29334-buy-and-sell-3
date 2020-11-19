"use strict";

const { Router } = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.status(200).send(`/my`));
myRouter.get(`/comments`, (req, res) => res.status(200).send(`/my/comments`));

module.exports = {
  myRouter,
};
