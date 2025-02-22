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
    res.sendFile(__dirname + '/public/html/ada.html');
});
app.all('/ios', (req, res) => {
    res.sendFile(__dirname + '/public/html/ida.html');
});
app.all('/windows', (req, res) => {
    res.sendFile(__dirname + '/public/html/wda.html');
});
app.all('/hosts', (req, res) => {
    res.sendFile(__dirname + '/public/html/hosts.html');
});
app.all('/file', (req, res) => {
    res.redirect('https://www.mediafire.com/file/2bi5h8f24gyg8ud/svps-hosts.txt/file');
});
app.all('/', (req, res) => {
    res.redirect('https://linktr.ee/sv.ps');
});

app.listen(5000, function () {
    console.log('Listening on port 5000');
});
