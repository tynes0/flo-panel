const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = await User.findOne({ username, password, role });
        if (!user) return res.status(401).json({ message: "Hatalı bilgiler" });
        res.json(user);
    } catch (err) { res.status(500).json(err); }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.json(users);
    } catch (err) { res.status(500).json(err); }
});

router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) { res.status(400).json(err); }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Kullanıcı silindi" });
    } catch (err) { res.status(500).json(err); }
});

router.patch('/:id/targets', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { targets: req.body },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) { res.status(400).json(err); }
});

router.patch('/:id/progress', async (req, res) => {
    const { taskKey, amount } = req.body;
    try {
        const update = { [`progress.${taskKey}`]: amount };
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $inc: update },
            { new: true }
        );
        res.json(user);
    } catch (err) { res.status(400).json(err); }
});

module.exports = router;