const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// port and mongodb Atlas url with username and password.
const port = 8000;
const dataBaseUrl = "mongodb+srv://Muhammed:Mhmd1234@cluster0.xgwxk49.mongodb.net/?retryWrites=true&w=majority";
// middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join('uploads')));
mongoose.set('strictQuery', false);
// connect to DataBase
mongoose.connect(dataBaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
// call routes
const adminRoutes = require('./routes/Admin.js'); // Route
const messagesRoutes = require('./routes/Message.js'); // Route
const blogsRoutes = require('./routes/Blog.js'); // Route
const productRoutes = require('./routes/Product.js'); // Route
const commentRoutes = require('./routes/Comment.js'); // Route
const usersRoutes = require('./routes/User.js'); // Route
const ordersRoutes = require('./routes/Order.js') // Route
// cors to protect the server 
app.use(cors({
  origin: 'http://localhost:4200',
}));
// users routes ... 
app.use('/admin', adminRoutes);
app.use('/messages', messagesRoutes);
app.use('/blogs', blogsRoutes);
app.use('/products', productRoutes);
app.use('/comments', commentRoutes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRoutes);
// run the app ...
app.listen(port, () => { console.log(`The serve is running on port:${port}`) });