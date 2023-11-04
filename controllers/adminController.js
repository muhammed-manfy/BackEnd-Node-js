const Admin_Model = require('../models/Admin.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = "SecretKey";

exports.getAdmin = async (req, res) => {
    await Admin_Model.find({}, (error, admins) => {
        if (!error) {
            if (admins.length > 0) {
                res.status(200).json(admins);
            } else {
                res.status(204).json({ message: "Not Found!" });
            }
        } else {
            res.status(500).json(error);
        }
    });

}

exports.updateAdminPassword = async (req, res) => {
    const id = req.params.id;
    await Admin_Model.findByIdAndUpdate(id, {
        password: req.body.password,
        updated_at: Date.now()
    })
        .then(() => {
            res.status(201).json({
                message: "Updated Password Successful!",
                status: true
            });
        }).catch((error) => {
            res.status(500).json({
                message: error.message,
                status: false
            })
        })

}
exports.updateAdminEmail = async (req, res) => {
    const id = req.params.id;
    await Admin_Model.findByIdAndUpdate(id, {
        email: req.body.email,
        updated_at: Date.now()
    })
        .then(() => {
            res.status(201).json({
                message: "Updated Email Successful!",
                status: true
            });
        }).catch((error) => {
            res.status(500).json({
                message: error.message,
                status: false
            })
        })

}

exports.createAdmin = async (req, res) => {
    const adminData = req.body;
    if (!validationAdmin(adminData)) {
        res.status(400).json({
            message: 'email and password is required',
            status: false
        });
    } else {
        const admin = new Admin_Model({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            created_at: Date.now()
        });
        const newAdmin = admin.save();
        await newAdmin.then(() => {
            res.status(201).json({
                message: 'created successfully!',
                status: true
            });
        }).catch(() => {
            res.status(500).json({
                message: 'server is down!',
                status: false
            })
        });
    }
}

exports.loginAdmin = async (req, res) => {
    const adminData = req.body;
    if (!validationAdmin(adminData)) {
        res.status(400).json({
            message: 'email and password is required',
            status: false
        });
    } else {
        try {
            const admin = await Admin_Model.findOne({ email: req.body.email });
            if (admin) {
                if (bcrypt.compareSync(req.body.password, admin.password)) {
                    const token = jwt.sign({ id: admin._id, secret: secret }, secret, { expiresIn: "1 day" });
                    return res.status(200).json({
                        token: token,
                        id: admin._id,
                        message: "You are logged in!",
                        status: true
                    });
                } else {
                    return res.status(400).json({
                        message: "password is wrong",
                        status: false
                    });
                }
            } else {
                return res.status(400).json({
                    message: "email is not valid",
                    status: false
                });
            }
        } catch (err) {
            res.status(500).json({
                message: err.message,
                status: false
            });
        }
    }
}

exports.logoutAdmin = async (req, res, next) => {
    try {
        let token = req.body.token;
        token = null;
        res.status(200).json({
            message: "You are logged out",
            status: true,
        });
    } catch (error) {
        res.status(406).json({
            message: "you must to log in!",
            status: false
        });
    }
}

// validate password and email admin 
function validationAdmin(data) {
    if (data.email == '' || data.email == undefined)
        return false;

    else if (data.password == '' || data.password == undefined)
        return false;

    return true;
}
// 