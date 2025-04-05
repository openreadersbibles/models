const fs = require('fs');
const path = require('path');

const assetsFolder = path.join(__dirname, 'assets');
const outputFolder = path.join(__dirname, 'assets');

fs.readdir(assetsFolder, (err, files) => {
    if (err) {
        console.error('Error reading assets folder:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(assetsFolder, file);
        const ext = path.extname(file);

        if (ext !== '.json') {
            fs.readFile(filePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    console.error(`Error reading file ${file}:`, readErr);
                    return;
                }

                const outputFileName = `${path.basename(file, ext)}.json`;
                const outputFilePath = path.join(outputFolder, outputFileName);

                const jsonContent = JSON.stringify({ content: data }, null, 2);

                fs.writeFile(outputFilePath, jsonContent, 'utf8', writeErr => {
                    if (writeErr) {
                        console.error(`Error writing file ${outputFileName}:`, writeErr);
                    } else {
                        console.log(`Created JSON file: ${outputFileName}`);
                    }
                });
            });
        }
    });
});