const request = require('request');


const externalProxy = 'http://127.0.0.1:8080';

module.exports = (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }

  
  try {
    new URL(targetUrl);
  } catch (err) {
    return res.status(400).send('Invalid URL');
  }

  const options = {
    url: targetUrl,
    method: 'GET',
    headers: {
      'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
      'Accept': req.headers['accept'] || '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': req.headers['accept-language'] || 'en-US,en;q=0.9',
      'Referer': targetUrl
    },
    followRedirect: true,
    encoding: null,
    proxy: externalProxy // <-- Вот здесь используется ТВОЙ прокси
  };

  request(options)
    .on('response', (response) => {
      Object.keys(response.headers).forEach(header => {
        res.setHeader(header, response.headers[header]);
      });
      res.status(response.statusCode);
    })
    .on('error', (err) => {
      console.error('Proxy error:', err.message);
      res.status(500).send('Error fetching URL');
    })
    .pipe(res);
};