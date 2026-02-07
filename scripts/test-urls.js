const https = require('https');

const urls = [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Western%20Ghats,%20Maharashtra,%20India.jpg', // Worked
    'https://commons.wikimedia.org/wiki/Special:FilePath/North%20Karnataka%20Landscape.jpg', // Failed?
    'https://commons.wikimedia.org/wiki/Special:FilePath/Darjeeling%20Tea%20Garden.jpg', // West Bengal failed?
];

const checkUrl = (url) => {
    return new Promise((resolve) => {
        https.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (res) => {
            console.log(`${res.statusCode} : ${url}`);
            resolve();
        }).on('error', (e) => {
            console.log(`ERR : ${url} - ${e.message}`);
            resolve();
        });
    });
};

const run = async () => {
    for (const url of urls) {
        await checkUrl(url);
    }
};

run();
