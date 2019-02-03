import http from 'http';

const port = 3000;
const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
    });

    res.end('Hello World');
});

server.listen(port, (error: Error) => {
    if (error) {
        console.log(error);
    }
    console.log(`App is running on port ${port}`);
});
