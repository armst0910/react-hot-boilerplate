
import Express from 'express';
import BodyParser from 'body-parser';

import {renderToString} from 'react-dom/server';
import {createStore} from 'redux';
import React from 'react';
import {Provider} from 'react-redux';
import todoApp from './src/reducers/'
import App from './src/components/App'

import webpack from 'webpack';
import config from './webpack.config.dev';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = new Express();
const compiler = webpack(config);
if (process.env.NODE_ENV !== 'production') {
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
}

app.use(Express.static(path.resolve(__dirname, 'dist')));

app.use(handleRender);

function handleRender(req, res) {

  const store = createStore(todoApp);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const initialState = store.getState();

  res.send(renderFullPage(html, initialState));
}

function renderFullPage(html, initialState) {
  return `
  <!doctype html>
  <html>
    <head>
      <title>Todo Sample App</title>
    </head>
    <body>
      <div id='root'>${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
      <script src='${process.env.NODE_ENV === 'production' ? '/app.production.js' : '/bundle.js' }'></script>
    </body>
  </html>

  `;

}

app.listen('3000');
