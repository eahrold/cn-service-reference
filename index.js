const fs = require('fs');

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

// Load info.json data
const infoFileContents = require('./data/info.json');

const resolveHost = (request) => {
    return request.headers['x-forwarded-host'] || request.get('host')
}

class InfoConfigError extends Error {
    constructor(message) {
        super(`[Info configuration error] ${message}`)
    }
}

class InfoConfig {
    constructor({ title, summary, website, icon }) {
        Object.assign(this, { title, summary, website, icon })
    }

    validate() {
        const { title, summary, website, icon } = this
        if(typeof title !== 'string' || !title.length) throw new InfoConfigError("title is required, and must be a string")
        if(typeof summary !== 'string' || !summary.length) throw new InfoConfigError("summary is required, and must be a string")
        if(typeof website !== 'string' || !website.length) throw new InfoConfigError("website is required, and must be a string")
        if(!website.startsWith('https')) throw new InfoConfigError("the website must be served over HTTPS")

        // If the icon has been declared in the JSON, it must also be served over HTTPS
        if(typeof icon === 'string' && !icon.startsWith("https")) throw new InfoConfigError("the custom icon must be served over HTTPS")
    }

    resolveIcon(request) {
        // If custom icon file has been defined use that.
        // otherwise use the default icon.png file
        return this.icon || `https://${resolveHost(request)}/icon.png`;
    }
}

const infoConfig = new InfoConfig(infoFileContents)

// Validate the config data
// If it's not in proper order this will throw.
infoConfig.validate()

app.use('/info', function(req, res, next)
{
    var icon = infoConfig.resolveIcon(req)
    res.status(200).json({...infoConfig, icon});
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
