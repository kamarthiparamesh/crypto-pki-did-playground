import { createServer } from 'http';
import { readFile } from 'fs';

// After running server you open the did:web document by going through http://localhost:3000/.well-known/did.json


const server = createServer((req, res) => {
    let filePath = '.' + req.url;

    readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('No File', 'utf-8');
        } else {
            res.writeHead(200);
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});