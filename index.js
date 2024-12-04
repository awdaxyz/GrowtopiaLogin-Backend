const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const ware = express();
let reqC = {};

ware.set('trust proxy', true);
ware.set('view engine', 'ejs');

ware.use(
    compression({
        level: 1,
        threshold: 0,
        filter: (req, res) => !req.headers['x-no-compression'] && compression.filter(req, res),
    })
);

ware.use((req, res, next) => {
    const clientIP = req.ip;
    const currentTime = Math.floor(Date.now() / 1000);
    const timeWindow = 10 * 60;
    const maxRequests = 100;
    if (!reqC[clientIP]) {
        reqC[clientIP] = [];
    }
    reqC[clientIP] = reqC[clientIP].filter((timestamp) => timestamp > currentTime - timeWindow);
    reqC[clientIP].push(currentTime);
    if (requestCounts[clientIP].length > maxRequests) {
        return res.status(429).json({ status: 'error', message: 'Too many requests, please try again later.' });
    }
    next();
});

ware.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    console.log(
        `${chalk.cyan(`[${new Date().toLocaleString()}]`)} ` +
        `${chalk.yellow(req.url)} ` +
        `${chalk.green(req.method)} ` +
        `${chalk.red(`Status: ${res.statusCode}`)}`
    );
    next();
});

ware.use(bodyParser.urlencoded({ extended: true }));
ware.use(express.json());

ware.all('/player/login/dashboard', (req, res) => {
    const gameData = {};
    try {
        const rData = JSON.stringify(req.body).split('"')[1].split('\\n');
        const user = rData[0].split('|');
        const pass = rData[1].split('|');
        rData.forEach((line) => {
            const [key, value] = line.split('|');
            gameData[key] = value;
        });

        if (user && pass) {
            return res.redirect('/player/growid/login/validate');
        }
    } catch (error) {
        console.error(`[ERROR] Parsing error: ${error.message}`);
    }

    res.render(`${__dirname}/public/html/dashboard.html`, { data: parsedData });
});

ware.post('/player/growid/login/validate', (req, res) => {
    const { _token, growId, password } = req.body;

    const eToken = Buffer.from(`_token=${_token}&growId=${growId}&password=${password}`).toString('base64');
    res.json({
        status: 'success',
        message: 'Account Validated.',
        token: eToken,
        url: '',
        accountType: 'growtopia',
    });
});

ware.all('/player/growid/checktoken', (req, res) => {
    const { refreshToken } = req.body;
    res.json({
        status: 'success',
        message: 'Account Validated.',
        token: refreshToken,
        url: '',
        accountType: 'growtopia',
    });
});

ware.all('/', (req, res) => {
    const gameData = {};
    try {
        const rData = JSON.stringify(req.body).split('"')[1].split('\\n');
        const user = rData[0].split('|');
        const pass = rData[1].split('|');
        rData.forEach((line) => {
            const [key, value] = line.split('|');
            gameData[key] = value;
        });

        if (user && pass) {
            return res.redirect('/player/growid/login/validate');
        }
    } catch (error) {
        console.error(`[ERROR] Parsing error: ${error.message}`);
    }

    res.render(`${__dirname}/public/html/dashboard.html`, { data: parsedData });
});

module.exports = (req, res) => ware(req, res);