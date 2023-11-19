const multer = require('multer');

const projectStorge = multer.diskStorage({
    destination: 'uploads/projects',
    filename: function (req, file, callBack) {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            callBack(null, file.originalname);
        else {
            cb(new Error(`Image uploaded is not of type jpg/jpeg 
            or png`), false);
        }
    }
});
module.exports.uploadProject = multer({ storage: projectStorge });

const productStorge = multer.diskStorage({
    destination: 'uploads/products',
    filename: function (req, file, callBack) {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            callBack(null, file.originalname);
        else {
            cb(new Error(`Image uploaded is not of type jpg/jpeg 
            or png`), false);
        }
    }
});
module.exports.uploadProduct = multer({ storage: productStorge });

const blogStorge = multer.diskStorage({
    destination: 'uploads/Videos',
    filename: function (req, file, callBack) {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            callBack(null, file.originalname);
        else {
            cb(new Error(`Image uploaded is not of type jpg/jpeg 
            or png`), false);
        }
    }
});
module.exports.uploadBlog = multer({ storage: blogStorge });

const userStorge = multer.diskStorage({
    destination: 'uploads/users',
    filename: function (req, file, callBack) {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
            callBack(null, file.originalname);
        else {
            cb(new Error(`Image uploaded is not of type jpg/jpeg 
            or png`), false);
        }
    }
});
module.exports.uploadUser = multer({ storage: userStorge });