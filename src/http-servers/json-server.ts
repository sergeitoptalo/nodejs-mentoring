import http from 'http';

const port = 3000;
const server = http.createServer();
const product = {
    brand: 'Supreme',
    id: 1,
    name: 'Supreme T-Shirt',
    options: [{ color: 'blue' }, { size: 'XL' }],
    price: 99.99,
};

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });

    res.end(JSON.stringify(product));
});

server.listen(port, (error: Error) => {
    if (error) {
        console.log(error);
    }
    console.log(`App is running on port ${port}`);
});
