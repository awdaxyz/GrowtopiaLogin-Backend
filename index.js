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

const noStaleCache = { lastModified: false, etag: false };
app.use(function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
app.use(express.static(__dirname + '/public', noStaleCache));

app.all('/android', (req, res) => {
    res.sendFile(__dirname + '/public/html/ada.html', noStaleCache);
});
app.all('/ios', (req, res) => {
    res.sendFile(__dirname + '/public/html/ida.html', noStaleCache);
});
app.all('/windows', (req, res) => {
    res.sendFile(__dirname + '/public/html/wda.html', noStaleCache);
});
app.all('/hosts', (req, res) => {
    res.sendFile(__dirname + '/public/html/hosts.html', noStaleCache);
});
app.all('/file', (req, res) => {
    res.redirect('https://www.mediafire.com/file/2bi5h8f24gyg8ud/svps-hosts.txt/file');
});

// ═══════════════════════════════════════════════
// ROUTE BARU: Proxy player count dari bot Discord
// ═══════════════════════════════════════════════
app.get('/api/players', async (req, res) => {
    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=10');
    
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(process.env.BOT_API_URL || 'http://45.142.115.57:3001/api/players', {
            signal: controller.signal
        });
        
        clearTimeout(timeout);
        
        if (!response.ok) throw new Error(`Upstream HTTP ${response.status}`);
        
        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (err) {
        console.error('[Players API] Error:', err.message);
        return res.status(200).json({
            online: 0,
            status: 'offline',
            timestamp: Date.now(),
            error: 'upstream_unavailable'
        });
    }
});
// ═══════════════════════════════════════════════

app.all('/', (req, res) => {
   res.sendFile(__dirname + '/public/html/main.html', noStaleCache);
});

// Di Vercel jangan panggil listen() - cukup export app-nya.
if (!process.env.VERCEL) {
    app.listen(5000, function () {
        console.log('Listening on port 5000');
    });
}

module.exports = app;
