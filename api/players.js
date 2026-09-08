// Vercel Serverless Function — proxy ke bot Discord di VPS
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // Cache 5 detik di edge biar ga spam VPS
    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=10');
    
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('http://45.142.115.57:3001/api/players', {
            signal: controller.signal,
            headers: { 'User-Agent': 'Vercel-Proxy/1.0' }
        });
        
        clearTimeout(timeout);
        
        if (!response.ok) {
            throw new Error(`Upstream HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (err) {
        // Kalau bot down / timeout, return offline status
        console.error('[Players API] Error:', err.message);
        return res.status(200).json({
            online: 0,
            status: 'offline',
            timestamp: Date.now(),
            error: 'upstream_unavailable'
        });
    }
}
