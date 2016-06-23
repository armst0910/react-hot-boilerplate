if (process.env.NODE_ENV === 'production') {
  require('./dist/server.bundle.js');
}else {
  require('babel-register');
  require('babel-polyfill');
  require('./server');
}
