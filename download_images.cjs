// Synchronizes vetted authentic Black African photography for PAMHO
const fs = require('fs');
const path = require('path');

const assetMap = [
    { name: 'home_hero.jpg', source: 'hero.jpg' },
    { name: 'home_institute.jpg', source: 'partners-collab.jpg' },
    { name: 'home_advocacy.jpg', source: 'ambassadors-network.jpg' },
    { name: 'about_hero.jpg', source: 'partners-banner.jpg' },
    { name: 'institute_hero.jpg', source: 'hero.jpg' },
    { name: 'ambassadors_hero.jpg', source: 'ambassadors-banner.jpg' },
    { name: 'programs_hero.jpg', source: 'join-banner.jpg' },
    { name: 'student_learning.jpg', source: 'join-participant.jpg' },
    { name: 'membership_hero.jpg', source: 'partners-banner.jpg' }
];

(() => {
    const srcDir = path.join(__dirname, 'frontend', 'src', 'assets');
    const destDir = path.join(__dirname, 'courses-frontend', 'public', 'images');
    
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    for (const item of assetMap) {
        const srcPath = path.join(srcDir, item.source);
        const destPath = path.join(destDir, item.name);
        
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Synced ${item.name} from ${item.source} (100% Black African imagery)`);
        } else {
            console.warn(`Source asset not found: ${srcPath}`);
        }
    }
})();

