
const https = require('https');

const keywords = [
    'kaziranga',
    'charminar',
    'hampi',
    'tamil-nadu',
    'kerala',
    'mysore-palace',
    'meenakshi-temple',
    'victoria-memorial',
    'konark-sun-temple',
    'living-root-bridges',
    'radhanagar-beach',
    'adventure',
    'spiritual'
];

const resolveUrl = (keyword) => {
    return new Promise((resolve) => {
        const url = `https://source.unsplash.com/featured/?${keyword}`;
        https.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                console.log(`'${keyword}': '${res.headers.location}',`);
                resolve();
            } else {
                console.log(`Failed to resolve ${keyword}: ${res.statusCode}`);
                // Try to consume response to free memory
                res.resume();
                resolve();
            }
        }).on('error', (e) => {
            console.log(`Error resolving ${keyword}: ${e.message}`);
            resolve();
        });
    });
};

const run = async () => {
    console.log('Resolving URLs...');
    for (const kw of keywords) {
        await resolveUrl(kw);
    }
};

run();
