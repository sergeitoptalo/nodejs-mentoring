import http from 'http';

const port = 3000;
const server = http.createServer();

server.on('request', (req, res) => {
    req.pipe(res);
});

server.listen(port, (error: Error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Echo server server is listening on port ${port}`);
});
