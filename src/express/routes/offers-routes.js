"use strict";

const {Router} = require(`express`);
const offersRoutes = new Router();

offersRoutes.get(`/`, (req, res) => res.status(200).render(`offers/ticket`));
offersRoutes.get(`/category/:id`, (req, res) =>
  res.status(200).render(`category`)
);
offersRoutes.get(`/edit/:id`, (req, res) =>
  res.status(200).render(`offers/ticket-edit`)
);
offersRoutes.get(`/add`, (req, res) =>
  res.status(200).render(`offers/new-ticket`)
);
offersRoutes.get(`/:id`, (req, res) => res.status(200).render(`offers/ticket`));

module.exports = {
  offersRoutes,
};
