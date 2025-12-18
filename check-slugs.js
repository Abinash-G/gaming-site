const fs = require('fs');

const dataFile = './Gamepage/assets/data.json';
const jsonFiles = ['./home.json', './Trending.json', './Top-free.json', './Top-paid.json'];

try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    const dataSlugs = new Set(Object.keys(data));

    console.log('--- Missing Slugs ---');

    jsonFiles.forEach(file => {
        if (!fs.existsSync(file)) return;
        const content = JSON.parse(fs.readFileSync(file, 'utf8'));

        const checkArray = (arr) => {
            arr.forEach(item => {
                if (item.link) {
                    const match = item.link.match(/game=([^&]+)/);
                    if (match) {
                        const slug = match[1];
                        if (!dataSlugs.has(slug)) {
                            console.log(slug);
                        }
                    }
                }
            });
        };

        if (Array.isArray(content)) {
            checkArray(content);
        } else {
            for (const key in content) {
                if (Array.isArray(content[key])) {
                    checkArray(content[key]);
                } else if (typeof content[key] === 'object') {
                    // handle nested objects if necessary, simplistic for now
                }
            }
        }
    });

} catch (err) {
    console.error(err);
}
