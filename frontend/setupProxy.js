const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');  // Import axios

axios.defaults.baseURL = 'http://localhost:4000';  // Set axios base URL

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};
