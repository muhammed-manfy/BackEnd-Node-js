const User_Model = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = "SecretKeyUser";

exports.getUsers = async (req, res) => {
    const currentPage = req.body.currentPage;
    const pageSize = req.body.pageSize;
    try {
        const totalUsers = await User_Model.find({});
        const users = await User_Model.find({}).skip(pageSize * currentPage).limit(pageSize);
        res.status(200).json({
            data: users,
            totalUsers: totalUsers.length,
            message: 'Success',
            status: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: false
        });
    }
}
    exports.getUser = async (req, res) => {
        let userId = req.params.id;
        let user = await User_Model.findById(userId);
        try {
            if (user) {
                res.status(200).json({
                    data: user,
                    message: 'success',
                    status: true
                });
            } else {
                res.status(204).json({
                    message: "Not Found!",
                    status: false
                });
            }
        } catch (error) {
            res.status(500).json({
                message: error.message,
                status: false
            });
        }
    }

    exports.updateEmailProfile = async (req, res) => {
        const id = req.params.id;
        await User_Model.findByIdAndUpdate(id, {
            email: req.body.email,
            updated_at: Date.now()
        })
            .then(() => {
                res.status(200).json({
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

    exports.updatePhoneProfile = async (req, res) => {
        const id = req.params.id;
        await User_Model.findByIdAndUpdate(id, {
            phone: req.body.phone,
            updated_at: Date.now()
        })
            .then(() => {
                res.status(200).json({
                    message: "Updated Phone Successful!",
                    status: true
                });
            }).catch((error) => {
                res.status(500).json({
                    message: error.message,
                    status: false
                })
            })
    }
    exports.updatePasswordProfile = async (req, res) => {
        const id = req.params.id;
        await User_Model.findByIdAndUpdate(id, {
            password: req.body.password,
            updated_at: Date.now()
        })
            .then(() => {
                res.status(200).json({
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
    exports.updateAddress = async (req, res) => {
        const id = req.params.id;
        await User_Model.findByIdAndUpdate(id, {
            address: req.body.address,
            city: req.body.city,
            emarite: req.body.emarite,
            companyName: req.body.companyName,
            updated_at: Date.now()
        })
            .then(() => {
                res.status(200).json({
                    message: "Updated Successful!",
                    status: true
                });
            }).catch((error) => {
                res.status(500).json({
                    message: error.message,
                    status: false
                })
            })
    }
    exports.updateUserImage = async (req, res) => {
        const id = req.params.id;
        const url = req.protocol + '://' + req.get("host");

        await User_Model.findByIdAndUpdate(id, {
            image: url + '/' + req.file.path,
            updated_at: Date.now()
        })
            .then(() => {
                res.status(200).json({
                    message: "Picture is Changed!",
                    status: true
                });
            }).catch((error) => {
                res.status(500).json({
                    message: error.message,
                    status: false
                });
            });
    }
    exports.createUser = async (req, res) => {
        const userData = req.body;
        let userValidMessageRegistration = validationUserRegistration(userData);

        if (userValidMessageRegistration != null) {
            res.status(400).json({
                message: userValidMessageRegistration,
                status: false,
            });
        } else {
            const user = new User_Model({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                created_at: Date.now()
            });
            const newUser = user.save();
            await newUser.then(() => {
                res.status(201).json({
                    message: 'created successfully!',
                    status: true
                });
            }).catch((error) => {
                res.status(500).json({
                    message: error.message,
                    status: false
                })
            });
        }
    }

    exports.loginUser = async (req, res) => {
        const userData = req.body;
        let userValidLoginMessage = validationUserLogin(userData);

        if (userValidLoginMessage !== null) {
            res.status(400).json({
                message: userValidLoginMessage,
                status: false,
            });
        } else {
            try {
                const user = await User_Model.findOne({ email: req.body.email });
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        const token = jwt.sign({ secret: secret }, secret, { expiresIn: "30m" });
                        return res.status(200).json({
                            token: token,
                            id: user._id,
                            expiresIn: 1800,
                            username: user.username,
                            message: "You are logged in!",
                            status: true
                        });
                    } else {
                        return res.status(400).json({
                            message: "Password is wrong try agin!",
                            status: false
                        });
                    }
                } else {
                    return res.status(400).json({
                        message: "Email Not found",
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

    exports.deleteUser = async (req, res, next) => {
        const id = req.params.id;
        try {
            await User_Model.findByIdAndDelete(id);
            res.status(200).json({
                message: "Deleted An Account Successfully!",
                status: true
            })
            next();
        } catch (error) {
            res.status(500).json({
                message: error.message,
                status: false
            });
        }
    }


    exports.getOrderUser = async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User_Model.findById({ _id: id });
            res.status(200).json({
                data: user,
                status: true
            });
        } catch (error) {
            res.status(500).json({
                messge: error.message,
                status: false
            });
        }
    }

    //  validate the user registration

    function validationUserRegistration(data) {

        if (data.username == '' || data.username == undefined)
            return 'username is required';

        else if (data.email == '' || data.email == undefined)
            return 'email is required';

        else if (data.password == '' || data.password == undefined)
            return 'password is required';

        return null;
    }


    // validate login username || email and password


    function validationUserLogin(data) {

        if (data.email == '' || data.email == undefined)
            return ' email is required';

        else if (data.password == '' || data.password == undefined)
            return 'password is required';

        return null;
    }

