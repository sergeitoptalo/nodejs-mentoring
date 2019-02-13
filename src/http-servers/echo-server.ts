import http from 'http';

const port = 3000;
const server = http.createServer();

server.on('request', (req, res) => {
    const queryFromReq = req.url.slice(req.url.indexOf('?') + 1);
    const parsedQueryArray = queryFromReq.split('&')
        .reduce((acc: string[], query: string) =>
            query.includes('=')
                ? query.split('=').concat(acc)
                : [''].concat(acc), []);

    const response: any = {};

    for (let index = 0; index < parsedQueryArray.length; index++) {
        if (!(index % 2) || index === 0) {
            response[parsedQueryArray[index]] = index + 1 ? parsedQueryArray[index + 1] : '';
        }
    }

    res.end(JSON.stringify(response));
});

server.listen(port, (error: Error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Echo server server is listening on port ${port}`);
});
