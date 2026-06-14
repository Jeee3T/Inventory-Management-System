const express = require ('express');
const router = express.Router();

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
} = require('../controllers/productController');

//api routes

router.get('/low-stock',getLowStockProducts);
router.post('/',createProduct);
router.get('/',getProducts);
router.delete('/:id',deleteProduct);
router.put('/:id',updateProduct);

module.exports = router;