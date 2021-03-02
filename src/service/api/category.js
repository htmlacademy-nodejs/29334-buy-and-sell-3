"use strict";

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

module.exports = (app, categoryService) => {
  const route = new Router();

  app.use(`/category`, route);

  route.get(`/`, async (req, res) => {
    const categories = await categoryService.findAll();
    res.status(HttpCode.OK).json(categories);
  });
};
