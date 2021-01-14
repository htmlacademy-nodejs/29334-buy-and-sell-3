"use strict";

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {ExitCode, MAX_ID_LENGTH} = require(`../../constants`);
const {getRandomInt, shuffle} = require(`../../utils`);
const {
  OfferType,
  SumRestrict,
  PictureRestrict,
} = require(`../../mock-constants`);
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const {nanoid} = require(`nanoid`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_OFFERS = 1000;
const MAX_COMMENTS = 5;

const getPictureFileName = (number) =>
  `item${number.toString().padStart(2, 0)}.jpg`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateOffers = (count, titles, categories, sentences, comments) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      category: [categories[getRandomInt(0, categories.length - 1)]],
      title: titles[getRandomInt(0, titles.length - 1)],
      picture: getPictureFileName(
        getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)
      ),
      description: shuffle(sentences).slice(1, 5).join(` `),
      type: Object.keys(OfferType)[
        Math.floor(Math.random() * Object.keys(OfferType).length)
      ],
      sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
    }));

const generateComments = (count, comments) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
    }));

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await (await readContent(FILE_SENTENCES_PATH)).filter(
      (it) => it !== ``
    );
    const titles = await (await readContent(FILE_TITLES_PATH)).filter(
      (it) => it !== ``
    );
    const categories = await (await readContent(FILE_CATEGORIES_PATH)).filter(
      (it) => it !== ``
    );
    const comments = await (await readContent(FILE_COMMENTS_PATH)).filter(
      (it) => it !== ``
    );
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_OFFERS) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(ExitCode.error);
    }
    const content = JSON.stringify(
      generateOffers(countOffer, titles, categories, sentences, comments)
    );

    try {
      // await util.promisify(fs.writeFile)(FILE_NAME, content);
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);
    }
  },
};
