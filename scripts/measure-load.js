const http = require('http');

const measure = (url) => {
    const start = performance.now();
    http.get(url, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            const end = performance.now();
            console.log(`Load time for ${url}: ${(end - start).toFixed(2)}ms`);
        });
    }).on('error', (e) => {
        console.error(`Error fetching ${url}:`, e.message);
    });
};

measure('http://localhost:3000/');
measure('http://localhost:3000/explore');
