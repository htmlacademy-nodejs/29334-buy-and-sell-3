"use strict";

const chalk = require(`chalk`);
const { ExitCode } = require(`../../constants`);

module.exports = {
  name: `--help`,
  run() {
    console.info(`
    Команды:
    ${chalk.grey(`--version`)}:            выводит номер версии
    ${chalk.grey(`--help`)}:               печатает этот текст
    ${chalk.grey(`--generate <count>`)}    формирует файл mocks.json
    `);
    process.exit(ExitCode.success);
  },
};
