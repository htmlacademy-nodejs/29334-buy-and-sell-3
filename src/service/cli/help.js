"use strict";

const chalk = require("chalk");
const { ExitCode } = require(`../../constants`);

module.exports = {
  name: `--help`,
  run() {
    console.info(`
    Команды:
    ${chalk.green(`--version`)}:            выводит номер версии
    ${chalk.green(`--help`)}:               печатает этот текст
    ${chalk.green(`--generate <count>`)}    формирует файл mocks.json
    `);
    process.exit(ExitCode.success);
  },
};
