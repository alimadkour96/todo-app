const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost:27018/todoApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// إعدادات التطبيق
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', todoRoutes);

// تشغيل الخادم
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});