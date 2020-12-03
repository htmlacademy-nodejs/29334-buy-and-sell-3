"use strict";

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;

const ExitCode = {
  success: 0,
  error: 1,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const PORT = 8080;
const API_DEFAULT_PORT = 3000;

const PUBLIC_DIR = `public`;
const MOCKS_FILENAME = `mocks.json`;

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode,
  HttpCode,
  PORT,
  PUBLIC_DIR,
  MOCKS_FILENAME,
  API_DEFAULT_PORT,
};
