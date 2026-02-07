const https = require('http');
const URL = require('url');

const domain = 'http://localhost:3000';
const visited = new Set();
const brokenLinks = [];
const brokenImages = [];

async function checkUrl(url) {
    return new Promise((resolve) => {
        const req = https.get(url, (res) => {
            resolve(res.statusCode);
        }).on('error', () => resolve(500));
        req.end();
    });
}

async function auditPage(path) {
    if (visited.has(path)) return;
    visited.add(path);

    console.log(`Auditing ${path}...`);

    // Fetch page content (simple mock fetch)
    const res = await new Promise((resolve) => {
        let data = '';
        https.get(domain + path, (response) => {
            response.on('data', chunk => data += chunk);
            response.on('end', () => resolve(data));
        }).on('error', () => resolve(''));
    });

    // Find images
    const imgRegex = /src=["'](\/[^"']+)["']/g;
    let match;
    while ((match = imgRegex.exec(res)) !== null) {
        const imgPath = match[1];
        if (!visited.has(imgPath)) {
            visited.add(imgPath);
            const status = await checkUrl(domain + imgPath);
            if (status !== 200) brokenImages.push({ page: path, src: imgPath, status });
        }
    }

    // Find internal links (simple 1-level depth for now)
    const linkRegex = /href=["'](\/[^"']+)["']/g;
    while ((match = linkRegex.exec(res)) !== null) {
        const linkPath = match[1];
        // Only check content availability, don't recursively crawl everything for this quick check
        if (!visited.has(linkPath) && !linkPath.startsWith('/_next') && !linkPath.startsWith('#')) {
            visited.add(linkPath);
            const status = await checkUrl(domain + linkPath);
            if (status !== 200) brokenLinks.push({ page: path, href: linkPath, status });
        }
    }
}

async function run() {
    await auditPage('/');
    await auditPage('/explore');

    console.log('\n--- Audit Results ---');
    console.log(`Checked ${visited.size} assets/pages.`);

    if (brokenImages.length > 0) {
        console.log('Broken Images:', brokenImages);
    } else {
        console.log('Content Accuracy (Images): 100%');
    }

    if (brokenLinks.length > 0) {
        console.log('Broken Links:', brokenLinks);
    } else {
        console.log('Content Accuracy (Links): 100%');
    }
}

run();
