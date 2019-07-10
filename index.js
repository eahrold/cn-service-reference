const fs = require('fs');
var iconFileBuffer = fs.readFileSync('./data/icon.png');
var icon = iconFileBuffer.toString('base64');

const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.text({type: 'text'}));

//Express Static File Serving
app.use(express.static('data'));

var infoFileContents = require('./data/info.json');
infoFileContents.icon = icon;

app.use('/info', function(req, res, next)
{
    res.status(200).json(infoFileContents);
});

app.use('/health', function(req, res, next)
{
    res.status(200).json({'status':"Healthy"});
});

app.use('/', function(req, res, next)
{
    res.status(200).sendFile(path.resolve(__dirname, './data/index.html'));
});

const port = 8080;
console.log("Starting simple server on port "+port);
var SimpleServer = http.createServer(app);
SimpleServer.listen(port);
