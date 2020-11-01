const Product = require('../models/products');

module.exports = {
    get_all_products: async (req, res) => {
        const products = await Product.getAll();
        res.status(200).json({
            products: products
        });
    },

    post_product: (req, res) => {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            productImage: req.file.path
        })

        product.save()
            .then(result => {
                res.status(200).json({
                    product: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    },

    get_product_by_id: async (req, res) => {
        const product = await Product.findProduct(req.params.productId);
        res.status(200).json({
            product: product
        });
    },

    update_product_by_id: async (req, res) => {
        await Product.updateProduct(req.params.productId, req.body);
        res.status(200).json({
            message: 'Update product',
            update: req.body
        });
    },

    delete_product: async (req, res) => {
        await Product.deleteProduct(req.body.productId);
        res.status(200).json({
            message: 'Delete product success'
        });
    }
}