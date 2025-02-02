const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// عرض جميع المهام
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ dueDate: 1 }); // ترتيب المهام حسب تاريخ الانتهاء
        res.render('index', { todos });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// إضافة مهمة جديدة
router.post('/add', async (req, res) => {
    const { title, dueDate } = req.body;
    try {
        const newTodo = new Todo({ title, dueDate });
        await newTodo.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// تحديث حالة المهمة
router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);
        todo.completed = !todo.completed;
        await todo.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// تحرير نص المهمة
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        await Todo.findByIdAndUpdate(id, { title });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// حذف مهمة
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.findByIdAndDelete(id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;