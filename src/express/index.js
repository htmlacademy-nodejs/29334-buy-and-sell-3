"use strict";
const express = require(`express`);
const path = require(`path`);
const {PORT, PUBLIC_DIR} = require(`../constants`);
const {mainRoutes, myRoutes, offersRoutes} = require(`./routes/index`);

const app = express();
app.listen(PORT);

app.set(`views`, __dirname + `/templates`);
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);
