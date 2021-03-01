"use strict";

const express = require(`express`);
const request = require(`supertest`);

const offer = require(`./offer`);
const DataService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);

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

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all offers`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 offers`, () =>
    expect(response.body.length).toBe(5));

  test(`First offer's id equals "2VxSRs"`, () =>
    expect(response.body[0].id).toBe(`2VxSRs`));
});

describe(`API returns an offer with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/2VxSRs`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Куплю Сиба-Ину"`, () =>
    expect(response.body.title).toBe(`Куплю Сиба-Ину`));
});

describe(`API creates an offer if data is valid`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/offers`).send(newOffer);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns offer created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () =>
    request(app)
      .get(`/offers`)
      .expect((res) => expect(res.body.length).toBe(6)));
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500,
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent offer`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).put(`/offers/2VxSRs`).send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () =>
    expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () =>
    request(app)
      .get(`/offers/2VxSRs`)
      .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`)));
});

test(`API returns status code 404 when trying to change non-existent offer`, () => {
  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404,
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {
  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`,
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/6V2_y7`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`6V2_y7`));

  test(`Offer count is 4 now`, () =>
    request(app)
      .get(`/offers`)
      .expect((res) => expect(res.body.length).toBe(4)));
});

test(`API refuses to delete non-existent offer`, () => {
  const app = createAPI();

  return request(app).delete(`/offers/NOEXST`).expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given offer`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/1cO4Bo/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 comments`, () =>
    expect(response.body.length).toBe(3));

  test(`First comment's id is "fKcoD_"`, () =>
    expect(response.body[0].id).toBe(`fKcoD_`));
});

describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers/1cO4Bo/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () =>
    request(app)
      .get(`/offers/1cO4Bo/comments`)
      .expect((res) => expect(res.body.length).toBe(4)));
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/offers/NOEXST/comments`)
    .send({
      text: `Неважно`,
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
  const app = createAPI();

  return request(app)
    .post(`/offers/1cO4Bo/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/1cO4Bo/comments/fKcoD_`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () =>
    expect(response.body.id).toBe(`fKcoD_`));

  test(`Comments count is 3 now`, () =>
    request(app)
      .get(`/offers/1cO4Bo/comments`)
      .expect((res) => expect(res.body.length).toBe(2)));
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/1cO4Bo/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent offer`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/NOEXST/comments/fKcoD_`)
    .expect(HttpCode.NOT_FOUND);
});
