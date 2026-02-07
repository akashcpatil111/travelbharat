
const fs = require('fs');
const path = require('path');
const https = require('https');

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        const request = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                console.log(`Redirecting ${url} to ${response.headers.location}`);
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filepath}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err.message);
        });
    });
};

const states = [
    { name: 'Jammu and Kashmir', url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?q=80&w=2940' },
    { name: 'Ladakh', url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2940' },
    { name: 'Himachal Pradesh', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2944' },
    { name: 'Uttarakhand', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Landscape%20of%20uttarakhand.jpg' },
    { name: 'Punjab', url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=2787' },
    { name: 'Rajasthan', url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2787' },
    { name: 'Uttar Pradesh', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2942' },
    { name: 'Gujarat', url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2952' },
    { name: 'Maharashtra', url: 'https://images.unsplash.com/photo-1651431301792-39edddc3b1e9?q=80&w=2940' },
    { name: 'Goa', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2874' },
    { name: 'Karnataka', url: 'https://images.unsplash.com/photo-1689946727963-be60e05fe278?q=80&w=2940' },
    { name: 'Kerala', url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2832' },
    { name: 'Tamil Nadu', url: 'https://images.unsplash.com/photo-1689525508929-eb6b773b1fd2?q=80&w=2940' },
    { name: 'Telangana', url: 'https://images.unsplash.com/photo-1741545979534-02f59c742730?q=80&w=2940' },
    { name: 'Andhra Pradesh', url: 'https://images.unsplash.com/photo-1710510799898-db406983d8e7?q=80&w=2940' },
    { name: 'West Bengal', url: 'https://images.unsplash.com/photo-1558431382-9b06d0507edc?q=80&w=2940' },
    { name: 'Odisha', url: 'https://images.unsplash.com/photo-1706790574525-d218c4c52b5c?q=80&w=2940' },
    { name: 'Bihar', url: 'https://media.istockphoto.com/id/505519489/photo/nalanda-university-bihar-ruin.webp?a=1&b=1&s=612x612&w=0&k=20&c=zOn0UhiauTcae9TuC8LyQka89b_QhOxJxBeNzybFl5A=' },
    { name: 'Sikkim', url: 'https://images.unsplash.com/photo-1637840611565-d040350d3716?q=80&w=2940' },
    { name: 'Meghalaya', url: 'https://media.istockphoto.com/id/1044860100/photo/living-root-bridge-of-meghalaya.webp?a=1&b=1&s=612x612&w=0&k=20&c=nAOMCsBfWqB0dhfkl_yhFhitaTaypToYdvWuifZkHXA=' },
    { name: 'Assam', url: 'https://plus.unsplash.com/premium_photo-1692049123825-8d43174c9c5c?q=80&w=2940' },
    { name: 'Madhya Pradesh', url: 'https://images.unsplash.com/photo-1671375159250-8f81a29e54e7?q=80&w=2940' },
    { name: 'Andaman and Nicobar', url: 'https://images.unsplash.com/photo-1589330273594-fade1ee91647?q=80&w=2940' }
];

const destinations = [
    { name: 'Dal Lake', url: 'https://images.unsplash.com/photo-1564329494258-3f72215ba175?q=80&w=2940' },
    { name: 'Pangong Lake', url: 'https://plus.unsplash.com/premium_photo-1697730113415-b33b83fe77c4?q=80&w=2940' },
    { name: 'Solang Valley', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=2944' },
    { name: 'Kasol', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Parvati_Valley,_Himachal_Pradesh.jpg' },
    { name: 'Rishikesh', url: 'https://images.unsplash.com/photo-1718383537411-6f9e727ae0bb?q=80&w=2940' },
    { name: 'Golden Temple', url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=2787' },
    { name: 'Jaipur City Palace', url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Jaipur_City_Palace%2C_Rajasthan.jpg' },
    { name: 'Jaisalmer Fort', url: 'https://images.unsplash.com/photo-1710347454810-e3d493dcc538?q=80&w=2940' },
    { name: 'Taj Mahal', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2942' },
    { name: 'Varanasi Ghats', url: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=2000' },
    { name: 'Gateway of India', url: 'https://images.unsplash.com/photo-1702538861077-6f169714043a?q=80&w=2940' },
    { name: 'Rann of Kutch', url: 'https://images.unsplash.com/photo-1664150543913-66f20bf84ba9?q=80&w=2940' },
    { name: 'Palolem Beach', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2874' },
    { name: 'Hampi', url: 'https://images.unsplash.com/photo-1689946727963-be60e05fe278?q=80&w=2940' },
    { name: 'Mysore Palace', url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mysore_Palace_Night.jpg' },
    { name: 'Alleppey', url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2832' },
    { name: 'Meenakshi Temple', url: 'https://images.unsplash.com/photo-1689525508929-eb6b773b1fd2?q=80&w=2940' },
    { name: 'Charminar', url: 'https://images.unsplash.com/photo-1741545979534-02f59c742730?q=80&w=2940' },
    { name: 'Victoria Memorial', url: 'https://images.unsplash.com/photo-1558431382-9b06d0507edc?q=80&w=2940' },
    { name: 'Konark Sun Temple', url: 'https://images.unsplash.com/photo-1677211352662-30e7775c7ce8?q=80&w=2940' },
    { name: 'Living Root Bridges', url: 'https://media.istockphoto.com/id/1044860100/photo/living-root-bridge-of-meghalaya.webp?a=1&b=1&s=612x612&w=0&k=20&c=nAOMCsBfWqB0dhfkl_yhFhitaTaypToYdvWuifZkHXA=' },
    { name: 'Kaziranga', url: 'https://images.unsplash.com/photo-1655288212750-dedac22f84d7?q=80&w=2940' },
    { name: 'Radhanagar Beach', url: 'https://images.unsplash.com/photo-1589330273594-fade1ee91647?q=80&w=2940' }
];

const categories = [
    { name: 'Heritage', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2942' },
    { name: 'Nature', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2774&auto=format&fit=crop' },
    { name: 'Spiritual', url: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=2000' },
    { name: 'Adventure', url: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2940' }
];

const misc = [
    { name: 'india-texture', url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2942&auto=format&fit=crop' }
];

const toSlug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const run = async () => {
    console.log('Starting download...');

    // States
    for (const state of states) {
        const filepath = path.join('public', 'images', 'states', `${toSlug(state.name)}.jpg`);
        try {
            await downloadImage(state.url, filepath);
        } catch (e) {
            console.error(`Failed: ${state.name}`, e);
        }
    }

    // Destinations
    for (const dest of destinations) {
        const filepath = path.join('public', 'images', 'destinations', `${toSlug(dest.name)}.jpg`);
        try {
            await downloadImage(dest.url, filepath);
        } catch (e) {
            console.error(`Failed: ${dest.name}`, e);
        }
    }

    // Categories
    for (const cat of categories) {
        const filepath = path.join('public', 'images', 'categories', `${toSlug(cat.name)}.jpg`);
        try {
            await downloadImage(cat.url, filepath);
        } catch (e) {
            console.error(`Failed: ${cat.name}`, e);
        }
    }

    // Misc
    for (const item of misc) {
        const filepath = path.join('public', 'images', 'misc', `${item.name}.jpg`);
        try {
            await downloadImage(item.url, filepath);
        } catch (e) {
            console.error(`Failed: ${item.name}`, e);
        }
    }

    console.log('All downloads processed.');
};

run();
