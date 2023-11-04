const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController.js')
const productMiddleware = require('../middelware/upload.js');
const uploadProduct = productMiddleware.uploadProduct;
const adminMiddleware = require('../middelware/checkAuthAdmin.js');

// get a product  
router.get('/getProduct/:id',productController.getProduct);

// get products to cart Page
router.post('/getProductsCart',productController.getProductsCart);

// products Pagination  
router.post('/pagination',productController.productsPagination);

// update a product 
router.put('/update/:id',[uploadProduct.single('image'),adminMiddleware.auth],productController.updateProduct);

// delete a product
router.delete('/delete/:id',adminMiddleware.auth,productController.deleteProduct);

// create a product
router.post('/create',[uploadProduct.single('image'),adminMiddleware.auth],productController.createProduct);

// display products
router.post('/displayProducts',productController.displayProducts);

module.exports = router;