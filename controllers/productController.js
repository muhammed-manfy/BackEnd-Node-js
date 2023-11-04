const Product_Model = require('../models/Product.js');

exports.getProduct = async (req, res) => {
    let product_id = req.params.id;
    try {
        const product = await Product_Model.findById(product_id);
        if (product) {
            res.status(200).json({
                data: product,
                messag: "success",
                status: true
            });
        } else {
            res.status(204).json({
                messag: "Not Found",
                status: false
            });
        }

    } catch (error) {
        res.status(504).json({
            messag: error.message,
            status: false
        });
    }
}

exports.getProductsCart = async (req, res) => {
    let products_ids = req.body.products_ids;
    try {
        const products = await Product_Model.find({ _id: { "$in": products_ids } });
        if (products) {
            res.status(200).json({
                data: products,
                messag: "success",
                status: true
            });
        } else {
            res.status(204).json({
                messag: "Not Found",
                status: false
            });
        }

    } catch (error) {
        res.status(504).json({
            messag: error.message,
            status: false
        });
    }
}
exports.updateProduct = async (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    const id = req.params.id;
    try {
        await Product_Model.findByIdAndUpdate(id, {
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            image: url + '/' + req.file.path,
            tag: req.body.tag,
            category: req.body.category,
            brand: req.body.brand,
            updated_at: Date.now()
        });
        res.status(201).json({
            message: "Updated Successfully!",
            status: true
        });
    } catch (error) {
        res.status(501).json({
            messag: error.messag,
            status: false
        })
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await Product_Model.findByIdAndDelete(id)
        res.status(200).json({
            message: 'Product deleted successfully!',
            status: true
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        })
    }
}
exports.createProduct = async (req, res) => {

    const productData = req.body;
    let productValidMessage = validationProduct(productData);

    if (productValidMessage !== null) {
        res.status(400).json({
            message: productValidMessage,
            status: false,
        });
    } else {
        const url = req.protocol + '://' + req.get("host");
        const product = new Product_Model({
            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            image: url + '/' + req.file.path,
            tag: req.body.tag,
            category: req.body.category,
            brand: req.body.brand,
            created_at: Date.now()
        });

        try {
            await product.save();
            res.status(201).json({
                message: "Created Successfully!",
                status: true,
            });
        } catch (error) {
            res.status(501).json({
                message: error.message,
                status: false
            })
        }
    }
}
exports.productsPagination = async (req, res) => {
    const pageSize = parseInt(req.body.pageSize);
    const currentPage = parseInt(req.body.currentPage);

    try {
        const totalProducts = await (await Product_Model.find()).length;
        const products = await Product_Model.find().skip(pageSize * currentPage).limit(pageSize);
        res.status(206).json({
            products: products,
            totalProducts: totalProducts,
            message: "success",
            status: true
        });
    } catch (error) {
        res.status(506).json({
            message: error.message,
            status: false
        })
    }
}


exports.displayProducts = async (req, res) => {
    const pageSize = parseInt(req.body.pageSize);
    const currentPage = parseInt(req.body.currentPage);
    const category = req.body.category;
    const brand = req.body.brand;
    const tag = req.body.tag;
    try {
        if (category) {
            const totalProducts = (await Product_Model.find({ category: category })).length;
            const categoriesProducts = await Product_Model.find({ category: category }).skip(pageSize * currentPage).limit(pageSize);
                return res.status(206).json({
                    products: categoriesProducts,
                    totalProducts: totalProducts,
                    message: "success",
                    status: true  
                });
        } else if (tag) {
            const totalProducts = (await Product_Model.find({ tag: tag })).length;
            const tagProducts = await Product_Model.find({ tag: tag }).skip(pageSize * currentPage).limit(pageSize);
                return res.status(206).json({
                    products: tagProducts,
                    totalProducts: totalProducts,
                    message: "success",
                    status: true
                });
        } else if (brand) {
            const totalProducts = (await Product_Model.find({ brand: brand })).length;
            const brandsProducts = await Product_Model.find({ brand: brand }).skip(pageSize * currentPage).limit(pageSize);
                return res.status(206).json({
                    products: brandsProducts,
                    totalProducts: totalProducts,
                    message: "success",
                    status: true
                });
        }
        const totalProducts = (await Product_Model.find()).length;
        const products = await Product_Model.find().skip(pageSize * currentPage).limit(pageSize);
            res.status(200).json({
                products: products,
                totalProducts: totalProducts,
                message: "success",
                status: true
            });
    } catch (error) {
                res.status(506).json({
                    message: error.message,
                    status: false
                })
        }
}


// validation product code 

function validationProduct(data) {

    if (data.productName == '' || data.productName == undefined)
        return "productName is required";

    else if (data.description == '' || data.description == undefined)
        return "description is required";

    else if (data.price == '' || data.price == undefined)
        return "price is required";

    else if (data.tag == '' || data.tag == undefined)
        return "tag is required";

    else if (data.category == '' || data.category == undefined)
        return "category is required";

    else if (data.brand == '' || data.brand == undefined)
        return "brand is required";

    return null;
}