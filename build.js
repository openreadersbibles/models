import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsFolder = path.join(__dirname, 'assets');
const inputFilePath = path.join(assetsFolder, 'default_latex_template.tex');
const outputFilePath = path.join(assetsFolder, 'default_latex_template.ts');

// Read the plaintext file and convert it to a TypeScript file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file ${inputFilePath}:`, err);
        return;
    }

    // Wrap the content in a TypeScript export statement
    const tsContent = `export const latexTemplate = ${JSON.stringify(data)};`;

    // Write the TypeScript file
    fs.writeFile(outputFilePath, tsContent, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error(`Error writing file ${outputFilePath}:`, writeErr);
        } else {
            console.log(`Created TypeScript file: ${outputFilePath}`);
        }
    });
});