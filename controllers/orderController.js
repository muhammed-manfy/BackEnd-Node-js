const Order_Model = require('../models/Order.js');
const User_Model = require('../models/User.js');


exports.getOrders = async (req, res) => {

    try {
        const orders = await Order_Model.find({});
        res.status(200).json({
            data: orders,
            message: "Success",
            status: true,
        });
    } catch (error) {
        res.status(504).json({
            message: err.message,
            status: false,
        });
    }
}

exports.getUserOrders = async (req, res) => {
    const id = req.params.id
    const currentPage = req.body.currentPage;
    const pageSize = req.body.pageSize;
    try {
        const totalOrders = await Order_Model.find({ userId: id });
        const orders = await Order_Model.find({ userId: id }).skip(pageSize * currentPage).limit(pageSize);
        res.status(200).json({
            data: orders,
            totalOrders: totalOrders.length,
            message: "success",
            status: true,
        });
    } catch (error) {
        res.status(504).json({
            message: error.message,
            status: false,
        });
    }
}

exports.getUserOrdersCanceled = async (req, res) => {
    const id = req.params.id
    try {
        const shippingOrders = await Order_Model.find({ userId: id, "products.status": "SHIPPING" });
        const orderedOrders = await  Order_Model.find({ userId: id, "products.status": "ORDERED" });
        const orders = shippingOrders.concat(orderedOrders);
        res.status(200).json({
            data: orders,
            totalOrders: orders.length,
            message: "Success",
            status: true,
        });
    } catch (error) {
        res.status(504).json({
            message: error.message,
            status: false,
        });
    }
}

exports.updateOrder = async (req, res) => {
    const id = req.params.id;
    try {
        await Order_Model.findByIdAndUpdate(id, {
            status: req.body.status,
            updated_at: Date.now()
        });
        res.status(200).json({
            message: "Updated status is Successful!",
            status: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        });
    }
}

exports.deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Order_Model.findByIdAndDelete(id);
        res.status(200).json({
            message: "Deleted Successfully!",
            satus: true
        })
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        });
    }
}

exports.createOrder = async (req, res) => {
    const order = new Order_Model({
        products: req.body.products,
        username: req.body.username,
        address: req.body.address,
        city: req.body.city,
        emarite: req.body.emarite,
        companyName: req.body.companyName,
        phone: req.body.phone,
        email: req.body.email,
        amount: req.body.amount,
        subtotal: req.body.subtotal,
        status: req.body.status,
        created_at: Date.now()
    });
    try {
        await order.save();
        res.status(201).json({
            message: "An Order is Created",
            status: true
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            status: false
        });
    }
}

exports.createOrderWithAuthUser = async (req, res) => {
    const order = new Order_Model({
        products: req.body.products,
        userId: req.body.userId,
        amount: req.body.amount,
        subtotal: req.body.subtotal,
        status: req.body.status,
        created_at: Date.now()
    });
    try {
        await order.save();
        res.status(201).json({
            message: "An Order is Created",
            status: true
        });
    } catch (error) {
        res.status(501).json({
            message: error.message,
            status: false
        });
    }
}

exports.getOrdersRequsets = async (req, res) => {
    const currentPage = req.body.currentPage;
    const pageSize = req.body.pageSize;
    try {
        const totalOrders = await Order_Model.find({ 'products.status': "ORDERED" });
        const orders = await Order_Model.find({ 'products.status': "ORDERED" }).skip(pageSize * currentPage).limit(pageSize);
        res.status(200).json({
            data: orders,
            totalOrders: totalOrders.length,
            message: "success",
            status: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

exports.getOrdersShippingStatusProducts = async (req, res) => {

    const currentPage = req.body.currentPage;
    const pageSize = req.body.pageSize;
    try {
        const totalOrders = await Order_Model.find({ 'products.status': 'SHIPPING' });
        const orders = await Order_Model.find({ 'products.status': 'SHIPPING' }).skip(currentPage * pageSize).limit(pageSize);
        if (orders) {
            res.status(200).json({
                data: orders,
                totalOrders: totalOrders.length,
                message: "success",
                status: true
            });
        } else {
            res.status(404).json({
                message: "Not Found Data",
                status: true
            });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}


exports.getOrdersCanceledStatusProducts = async (req, res) => {
    const currentPage = req.body.currentPage;
    const pageSize = req.body.pageSize;
    try {
        const totalOrders = await Order_Model.find({ 'products.status': 'CANCELED' });
        const orders = await Order_Model.find({ 'products.status': 'CANCELED' }).skip(currentPage * pageSize).limit(pageSize);
        res.status(200).json({
            data: orders,
            totalOrders: totalOrders.length,
            message: "success",
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}


exports.updateProductsStatusToShipping = async (req, res) => {
    try {
        const id_no = parseInt(req.params.id_no);
        const order_id = req.params.order_id;
        await Order_Model.updateOne({ _id: order_id, "products.ID_NO": id_no }, {
            '$set': { 'products.$[].status': 'SHIPPING' }
        }, { "multi": true });
        res.status(200).json({
            message: 'Product is Shipping!',
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        });
    }
}

exports.updateProductsStatusToDelivered = async (req, res) => {
    try {
        const id_no = parseInt(req.params.id_no);
        const order_id = req.params.order_id;
        await Order_Model.updateOne({ _id: order_id, "products.ID_NO": id_no }, {
            '$set': { 'products.$[].status': 'DELIVERED' }
        }, { "multi": true });
        res.status(200).json({
            message: 'Product is Delivered!',
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        });
    }
}

exports.updateProductsStatusToCanceled = async (req, res) => {
    try {
        const ordersIds = req.body.orders_ids;
        const productsIds = req.body.products_ids;
        const reasonText = req.body.reasonText;

        await Order_Model.updateMany({ _id: { "$in": ordersIds }, "products.ID_NO": { $in: productsIds } }, {
            '$set': { 'products.$[].status': 'CANCELED', "products.$[].returnProductText": reasonText }
        }, { "multi": true });
        res.status(200).json({
            message: 'Product is Canceled!',
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        });
    }
}

exports.getOrdersDeleviredStatusProducts = async (req, res) => {
    const currentPage = req.body.currentPage;
    const pageSize = req.body.pageSize;
    try {
        const totalOrders = await Order_Model.find({ 'products.status': 'DELIVERED' });
        const orders = await Order_Model.find({ 'products.status': 'DELIVERED' }).skip(currentPage * pageSize).limit(pageSize);
        if (orders) {
            res.status(200).json({
                data: orders,
                totalOrders: totalOrders.length,
                message: "success",
                status: true
            });
        } else {
            res.status(404).json({
                message: "Not Found Data",
                status: true
            });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}

