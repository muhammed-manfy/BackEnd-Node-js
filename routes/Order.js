const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orderController.js') 
const adminMiddleware = require('../middelware/checkAuthAdmin.js');
const userMiddleware = require('../middelware/checkUserAuth.js');

// get orders to admins
router.get('/admin/requsets',adminMiddleware.auth,orderController.getOrders);

// get orders to user
router.post('/users/getUserOrders/:id',orderController.getUserOrders);

// get orders to user 
router.get('/users/getUserOrdersCanceled/:id',orderController.getUserOrdersCanceled); // edit to post

//  update a status order from admin 
router.put('/admin/status/update/:id',adminMiddleware.auth,orderController.updateOrder);

//  delete a order from admin
router.delete('/admin/delete/:id',adminMiddleware.auth ,orderController.deleteOrder);

//  create a order from userGuest
router.post('/userOrder/create',orderController.createOrder); 

//  create a order from userAuth
router.post('/userAuth/userOrder/create',orderController.createOrderWithAuthUser); 

// get orders requstes
router.post('/admin/getOrdersRequests',orderController.getOrdersRequsets);

// get shipping status oreders with admin middleware
router.post('/admin/getShippingStatus',orderController.getOrdersShippingStatusProducts);

// get canceled orders for user
router.post('/admin/getCanceledStatus',orderController.getOrdersCanceledStatusProducts);
  
// update product status with admin middleware 
router.get('/admin/updateProductStatusToShipping/:id_no/:order_id',adminMiddleware.auth,orderController.updateProductsStatusToShipping);

// update product status with admin middleware 
router.get('/admin/updateProductsStatusToDelivered/:id_no/:order_id',adminMiddleware.auth,orderController.updateProductsStatusToDelivered);

// update products status to canceled
router.put('/updateProductsStatusToCanceled',userMiddleware.auth,orderController.updateProductsStatusToCanceled);

// get products order with delivery status
router.post ('/admin/getOrdersDeleviredStatusProducts',orderController.getOrdersDeleviredStatusProducts)

// get products orders with Canceled Status
router.post('/user/getOrdersCanceledStatusProducts',orderController.getOrdersCanceledStatusProducts);


module.exports = router;