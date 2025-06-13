const express = require('express');
const router = express.Router();
const Hadis = require('../models/hadis');

router.get('/api/hadis', async (req, res) => {
    try {
        const allHadis = await Hadis.find().sort({ created: -1 }); // مرتب‌سازی از جدیدترین
        res.json(allHadis);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.delete('/api/hadis/:id', async (req, res) => {
    try {
        const result = await Hadis.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Hadis not found' });
        }
        res.json({ message: 'Hadis deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


module.exports = router;