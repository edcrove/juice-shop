const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3030, function() {
    console.log('App is listening on port 3030');
    console.log('http://localhost:3030');
});
