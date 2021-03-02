"use strict";

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    id: `2VxSRs`,
    category: [`Личные вещи`],
    title: `Куплю Сиба-Ину`,
    picture: `item01.jpg`,
    description: `Если товар не понравится — верну всё до последней копейки. Если не понравится, заберу обратно Доставка бесплатная Таких предложений больше нет!`,
    type: `OFFER`,
    sum: 91111,
    comments: [
      {id: `3hk4dc`, text: `Неплохо, но дорого.`},
      {id: `0EXg9t`, text: `Продаю в связи с переездом. Отрываю от сердца.`},
      {
        id: `duCG4O`,
        text: `Неплохо, но дорого. С чем связана продажа? Почему так дешёво?`,
      },
      {id: `xCcOOm`, text: `Совсем немного...`},
    ],
  },
  {
    id: `6V2_y7`,
    category: [`Книги`],
    title: `Продам новую приставку Sony Playstation 5`,
    picture: `item04.jpg`,
    description: `Таких предложений больше нет! Товар в отличном состоянии. Даю недельную гарантию. Пользовались бережно и только по большим праздникам.`,
    type: `SALE`,
    sum: 5595,
    comments: [{id: `k5N8s7`, text: `А где блок питания? Неплохо, но дорого.`}],
  },
  {
    id: `1cO4Bo`,
    category: [`Личные вещи`],
    title: `Продам отличную подборку фильмов на VHS`,
    picture: `item06.jpg`,
    description: `Если товар не понравится — верну всё до последней копейки. Это настоящая находка для коллекционера! Товар в отличном состоянии. Если найдёте дешевле — сброшу цену.`,
    type: `SALE`,
    sum: 23134,
    comments: [
      {id: `fKcoD_`, text: `Вы что?! В магазине дешевле.`},
      {
        id: `1nWCWM`,
        text: `С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?`,
      },
      {
        id: `wchx0Y`,
        text: `Неплохо, но дорого. Почему в таком ужасном состоянии?`,
      },
    ],
  },
  {
    id: `vs6yOg`,
    category: [`Игры`],
    title: `Продам новую приставку Sony Playstation 5`,
    picture: `item09.jpg`,
    description: `При покупке с меня бесплатная доставка в черте города. Если товар не понравится — верну всё до последней копейки. Это настоящая находка для коллекционера! Продаю с болью в сердце...`,
    type: `SALE`,
    sum: 42034,
    comments: [
      {
        id: `1BDf36`,
        text: `С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту? А сколько игр в комплекте?`,
      },
      {
        id: `KD1A-R`,
        text: `А сколько игр в комплекте? Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.`,
      },
      {
        id: `XkO3rU`,
        text: `А где блок питания? Оплата наличными или перевод на карту?`,
      },
    ],
  },
  {
    id: `pTRvQ2`,
    category: [`Игры`],
    title: `Продам отличную подборку фильмов на VHS`,
    picture: `item03.jpg`,
    description: `Если не понравится, заберу обратно Пользовались бережно и только по большим праздникам. Таких предложений больше нет! Доставка бесплатная`,
    type: `SALE`,
    sum: 89201,
    comments: [
      {
        id: `JzE4Yh`,
        text: `Совсем немного... Продаю в связи с переездом. Отрываю от сердца.`,
      },
      {
        id: `Nx1BrR`,
        text: `Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?`,
      },
      {
        id: `mziU8W`,
        text: `Совсем немного... Неплохо, но дорого. Оплата наличными или перевод на карту?`,
      },
      {id: `jCyte4`, text: `Оплата наличными или перевод на карту?`},
      {id: `9c9ILq`, text: `С чем связана продажа? Почему так дешёво?`},
    ],
  },
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 categories`, () =>
    expect(response.body.length).toBe(3));

  test(`Category names are "Личные вещи", "Книги", "Игры"`, () =>
    expect(response.body).toEqual(
      expect.arrayContaining([`Личные вещи`, `Книги`, `Игры`])
    ));
});
