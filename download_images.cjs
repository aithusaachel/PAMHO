const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    { name: 'home_hero.jpg', url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1920&q=80' },
    { name: 'home_institute.jpg', url: 'https://images.unsplash.com/photo-1541814674753-2746816e87a9?auto=format&fit=crop&w=1920&q=80' },
    { name: 'home_advocacy.jpg', url: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1920&q=80' },
    { name: 'about_hero.jpg', url: 'https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=1920&q=80' },
    { name: 'institute_hero.jpg', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80' }
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return download(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', err => {
            fs.unlink(dest, () => {});
            reject(err.message);
        });
    });
};

(async () => {
    for (const img of images) {
        const dest = path.join(__dirname, 'courses-frontend', 'public', 'images', img.name);
        console.log(`Downloading ${img.name}...`);
        try {
            await download(img.url, dest);
            console.log(`Successfully downloaded ${img.name}`);
        } catch (err) {
            console.error(`Failed to download ${img.name}: ${err}`);
        }
    }
})();
