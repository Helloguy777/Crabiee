const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || 'text/html';

    
    res.setHeader('Content-Type', contentType);
    const data = await response.text();

   
    res.send(data);
  } catch (err) {
    res.status(500).send('Proxy error');
  }
};