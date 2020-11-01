const express = require('express');
const multer = require('multer');

//setup multer use upload images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, false)
    }
    else { cb(null, true) }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*10
    },
    fileFilter: fileFilter
});

const router = express.Router();

const productController = require('../controllers/product');

router.get('/', productController.get_all_products);

router.post('/', upload.single('productImage'), productController.post_product);

router.get('/:productId', productController.get_product_by_id);

router.patch('/:productId', productController.update_product_by_id);

router.delete('/:productId', productController.delete_product);

module.exports = router;