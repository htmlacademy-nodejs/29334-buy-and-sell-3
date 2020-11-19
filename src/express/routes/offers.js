"use strict";

const { Router } = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/`, (req, res) => res.status(200).send(`/offers`));
offersRouter.get(`/category/:id`, (req, res) =>
  res.status(200).send(`/offers/category/` + Number.parseInt(req.params.id, 10))
);
offersRouter.get(`/edit/:id`, (req, res) =>
  res.status(200).send(`/offers/edit/` + Number.parseInt(req.params.id, 10))
);
offersRouter.get(`/add`, (req, res) => res.status(200).send(`/offers/add`));
offersRouter.get(`/:id`, (req, res) =>
  res.status(200).send(`/offers/` + Number.parseInt(req.params.id, 10))
);

module.exports = {
  offersRouter,
};
