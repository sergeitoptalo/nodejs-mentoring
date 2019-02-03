import http from 'http';
import fs from 'fs';

const port = 3000;
const server = http.createServer();
const message = 'HTML-server';

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
    });

    let markup: Buffer | string = '';

    try {
        markup = fs
            .readFileSync('./src/http-servers/index.html', {encoding: 'UTF-8'})
            .toString()
            .replace('{message}', message);
    }
    catch (error) {
        console.log(error);
        res.write('Please try again later')
    }

    res.end(markup);
});

server.listen(port, (error: Error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Html server is listening on port ${port}`);
});