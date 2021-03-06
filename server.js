import Express from 'express';
import Logger from 'morgan';
import bodyParser from 'body-parser';
import stormpath from 'express-stormpath';

const app = new Express();

app.use(Logger('dev'));

app.use(bodyParser.json({
  type: [
    'application/json',
  ]
}));

app.use(stormpath.init(app, {
  apiKeyId:     process.env.STORMPATH_API_KEY_ID,
  apiKeySecret: process.env.STORMPATH_API_KEY_SECRET,
  secretKey:    process.env.STORMPATH_SECRET_KEY,
  application:  process.env.STORMPATH_URL,
}));

app.get('/', stormpath.loginRequired);

app.get('/', (req, res, next) => {
  console.log(req.user);
  next();
});

// Static asset endpoints
app.use(Express.static('./public'));

app.use(errorLogger);
app.use(xhrErrorHandler);
app.use(errorHandler);

export default app;

function errorLogger(error, req, res, next) {
  // change to to true to enable error loggging for tests:
  var loggingEnabled = false || process.env.NODE_ENV !== 'test';

  if (loggingEnabled) console.error(error.stack);
  next(error);
}

function xhrErrorHandler(error, req, res, next) {
  if (req.xhr) {
    res.status(500).send({error}).end();
  } else {
    next(error);
  }
}

function errorHandler(error, req, res, next) {
  res.status(500).send('An internal error occurred.').end();
}
