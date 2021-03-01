"use strict";

const fs = require(`fs`).promises;
const {join} = require(`path`);
const {MOCKS_FILENAME} = require(`../../constants`);

let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(
        join(__dirname, `..`, `..`, `..`, MOCKS_FILENAME)
    );

    data = JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
