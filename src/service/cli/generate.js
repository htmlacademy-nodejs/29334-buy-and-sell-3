"use strict";
const fs = require(`fs`);
const chalk = require(`chalk`);
const util = require(`util`);
const {ExitCode} = require(`../../constants`);
const {getRandomInt, shuffle} = require(`../../utils`);
const {TITLES,
  SENTENCES,
  CATEGORIES,
  OfferType,
  SumRestrict,
  PictureRestrict} = require(`../../mock-constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_OFFERS = 1000;

const getPictureFileName = (number) =>
  `item${number.toString().padStart(2, 0)}.jpg`;

const generateOffers = (count) =>
  Array(count)
    .fill({})
    .map(() => ({
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      picture: getPictureFileName(
          getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)
      ),
      description: shuffle(SENTENCES).slice(1, 5).join(` `),
      type: Object.keys(OfferType)[
        Math.floor(Math.random() * Object.keys(OfferType).length)
      ],
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
      category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    }));

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_OFFERS) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await util.promisify(fs.writeFile)(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  },
};
