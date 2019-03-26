const Product = require('../../mongoDb/models/user.model').Product;

const addNewProduct = (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);

    Product.countDocuments({})
        .then((count) => {
            newProduct.productId = count + 1;

            Product.create(newProduct, (error, product) => {
                if (error) {
                    res.json({ error });
                }

                res.json(product);
            });
        })
        .catch((error) => {
            res.json({ error });
        });
}

module.exports = { addNewProduct };
