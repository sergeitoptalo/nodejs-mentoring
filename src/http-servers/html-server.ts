import fs from 'fs';
import http from 'http';
import { indexPath } from './constants';

const port = 3000;
const server = http.createServer();
const message = 'HTML-server';

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
    });

    let markup: Buffer | string = '';

    try {
        const readable = fs.createReadStream(indexPath, { encoding: 'UTF-8' });

        readable.on('data', (chunk) => {
            markup += chunk.toString();
        });

        readable.on('end', () => {
            markup = (markup as string).replace('{message}', message);
            res.end(markup);
        });
        /*  markup = fs
             .readFileSync('./src/http-servers/index.html', {encoding: 'UTF-8'})
             .toString()
             .replace('{message}', message); */
    } catch (error) {
        console.log(error);
        res.write('Please try again later');
    }
});

server.listen(port, (error: Error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Html server is listening on port ${port}`);
});
