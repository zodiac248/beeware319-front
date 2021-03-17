
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://beeware319.herokuapp.com',
            changeOrigin: true
        })
    );
};