const express = require('express');
const path = require('path');
const app = express();
const proxy = require('./proxy'); 


app.use(express.static('public'));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/icons', express.static(path.join(__dirname, 'icons')));


app.get('/proxy', proxy);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`crabiee's playground http://localhost:${PORT}`);
});