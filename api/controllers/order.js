const Order = require('../models/orders');

module.exports = {
    get_all_orders: (req, res) => {
        Order.find()
            .select('product quantity _id')
            .populate('product', 'name price')
            .exec()
            .then(docs => {
                res.status(200).json({
                    count: docs.length,
                    orders: docs.map(doc => {
                        return {
                            _id: doc._id,
                            product: doc.product,
                            quantity: doc.quantity,
                            request: {
                                type: 'GET',
                                url: `http://localhost:3001/orders/${doc._id}`
                            }
                        }
                    })
                    
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
    },
    post_order: async (req, res) => {
        await Order.postOrder(req.body);
        res.status(201).json({
            message: 'Post orders',
            order: req.body
        });
    },
    get_order_by_id: async (req, res) => {
        const id = req.params.orderId;
        const order = await Order.findOrderById(id);
        res.status(200).json({
            order: order
        });
    },
    delete_order_by_id: async (req, res) => {
        const id = req.params.orderId;
        await Order.deleteOrder(id);
        res.status(200).json({
            message: `Delete id = ${id}`
        });
    }
}