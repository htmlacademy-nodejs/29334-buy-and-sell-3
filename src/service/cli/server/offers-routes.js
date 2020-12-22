"use strict";

const {Router} = require(`express`);
const fs = require(`fs`).promises;
const offersRoutes = new Router();
const {join} = require(`path`);
const {MOCKS_FILENAME, HttpCode} = require(`../../../constants`);

offersRoutes.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(
      join(__dirname, `..`, `..`, `..`, `..`, MOCKS_FILENAME)
    );
    const mocks = JSON.parse(fileContent);
    return res.json(mocks);
  } catch (err) {
    // res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
    const empty = [];
    res.status(HttpCode.OK).json(empty);
  }
});

module.exports = {
  offersRoutes,
};
