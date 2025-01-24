const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.json());

app.all('/android', (req, res) => {
    res.sendFile(__dirname + '/public/html/adashboards.html');
});
app.all('/ios', (req, res) => {
    res.sendFile(__dirname + '/public/html/idashboard.html');
});
app.all('/windows', (req, res) => {
    res.sendFile(__dirname + '/public/html/wdashboard.html');
});
app.all('/hosts', (req, res) => {
    res.send(
        '139.99.91.225 www.growtopia1.com'
        + '139.99.91.225 www.growtopia2.com');
});

app.listen(5000, function () {
    console.log('Listening on port 5000');
});
