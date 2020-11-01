const express = require('express');
const orderController = require('../controllers/order')

const router = express.Router();

// router.get('/', async (req, res) => {
//     const order = await Order.getAll();
//     res.status(200).json({
//         orders: order
//     });
// });

router.get('/', orderController.get_all_orders);

router.post('/', orderController.post_order);

router.get('/:orderId', orderController.get_order_by_id);

router.delete('/:orderId', orderController.delete_order_by_id);

module.exports = router;