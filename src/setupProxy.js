const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/api', { target: 'https://beeware319.herokuapp.com' }));
};