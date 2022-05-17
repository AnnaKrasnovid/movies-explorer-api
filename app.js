require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/middlewares');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/moviesdb', { useNewUrlParser: true });

app.use(requestLogger);
app.use(cors());

/*app.use(cors({
  origin: [
    'https://localhost:3001',
    'https://localhost:3000',
    'https://api.movies.krasnovid.nomoredomains.work',
    'https://movies.krasnovid.nomoredomains.xyz',
  ],
}));*/

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
