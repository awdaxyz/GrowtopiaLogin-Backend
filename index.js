const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const chalk = require('chalk'); // Pastikan Anda memiliki package chalk jika digunakan

const ware = express();
let reqC = {};

ware.set('trust proxy', true);
ware.set('view engine', 'ejs');

// Middleware untuk kompresi
ware.use(
    compression({
        level: 1,
        threshold: 0,
        filter: (req, res) =>
            !req.headers['x-no-compression'] && compression.filter(req, res),
    })
);

// Middleware untuk rate-limiting
ware.use((req, res, next) => {
    const clientIP = req.ip;
    const currentTime = Math.floor(Date.now() / 1000);
    const timeWindow = 10 * 60; // 10 menit
    const maxRequests = 100;

    if (!reqC[clientIP]) {
        reqC[clientIP] = [];
    }

    reqC[clientIP] = reqC[clientIP].filter((timestamp) => timestamp > currentTime - timeWindow);
    reqC[clientIP].push(currentTime);

    if (reqC[clientIP].length > maxRequests) {
        return res.status(429).json({
            status: 'error',
            message: 'Too many requests, please try again later.',
        });
    }

    next();
});

// Middleware untuk logging dan CORS
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

// Middleware untuk body parsing
ware.use(bodyParser.urlencoded({ extended: true }));
ware.use(express.json());

// Route untuk dashboard login
ware.all('/player/login/dashboard', (req, res) => {
    const gameData = {};
    try {
        const rData = JSON.stringify(req.body).split('"')[1].split('\\n');
        rData.forEach((line) => {
            const [key, value] = line.split('|');
            gameData[key] = value;
        });

        const user = rData[0]?.split('|');
        const pass = rData[1]?.split('|');

        if (user && pass) {
            return res.redirect('/player/growid/login/validate');
        }
    } catch (error) {
        console.error(`[ERROR] Parsing error: ${error.message}`);
    }

    res.render(`${__dirname}/public/html/dashboard.html`, { data: gameData });
});

// Route untuk validasi login
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

// Route untuk cek token
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

// Route default
ware.all('/', (req, res) => {
    const gameData = {};
    try {
        const rData = JSON.stringify(req.body).split('"')[1].split('\\n');
        rData.forEach((line) => {
            const [key, value] = line.split('|');
            gameData[key] = value;
        });

        const user = rData[0]?.split('|');
        const pass = rData[1]?.split('|');

        if (user && pass) {
            return res.redirect('/player/growid/login/validate');
        }
    } catch (error) {
        console.error(`[ERROR] Parsing error: ${error.message}`);
    }

    res.render(`${__dirname}/public/html/dashboard.html`, { data: gameData });
});

// Ekspor middleware
module.exports = (req, res) => ware(req, res);
