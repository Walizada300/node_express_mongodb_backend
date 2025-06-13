const express = require('express');
const router = express.Router();
const Hadis = require('../models/hadis');

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
    });
});
router.get('/event', (req, res) => {
    res.render('event', {
        title: 'Events',
    });
});

router.get('/hadis', (req, res) => {
    const message = req.session.message;
    req.session.message = null; 

    Hadis.find().sort({ created: -1 }).then(hadis => {
        res.render('hadis', {
            title: 'Hadis',
            message: message,
            hadis: hadis // 🔍 اصلاح اینجا
        });
    }).catch(err => {
        console.error('Error fetching hadis:', err);
        req.session.message = {
            type: 'danger',
            message: 'Error fetching hadis: ' + err.message
        };
        res.redirect('/');
    });
});

router.get('/add-hadis', (req, res) => {
    res.render('add-hadis', {
        title: 'Add New Hadis',
    });
});
router.post('/register-hadis', (req, res) => {
    const hadis = new Hadis({
        number: req.body.hadisNo,
        title: req.body.hadisTitle,
        dari: req.body.hadisDari,
        pashto: req.body.hadisPashto,
        english: req.body.hadisEnglish,
    });
    hadis.save()
        .then(() => {
            req.session.message = {
                type: 'success',
                message: 'Hadis added successfully!'
            };
            console.log("Session message set:", req.session.message); // 🔍 بررسی اینجا
            res.redirect('/hadis');
        })
        .catch(err => {
            req.session.message = {
                type: 'danger',
                message: 'Error adding hadis: ' + err.message
            };
            res.redirect('/add-hadis');
        });
});


router.delete('/hadis/delete/:id', async (req, res) => {
    try {
        await Hadis.findByIdAndDelete(req.params.id);
        req.session.message = {
            type: 'success',
            message: 'حدیث موفقانه حذف شد!'
        };
        res.redirect('/hadis');
    } catch (err) {
        console.error('Error deleting hadis:', err);
        req.session.message = {
            type: 'danger',
            message: 'خطا در حذف حدیث!'
        };
        res.redirect('/hadis');
    }
});

router.get('/hadis/update/:id', async (req, res) => {
    try {
        const hadis = await Hadis.findById(req.params.id);
        res.render('edit-hadis', {
            title: 'ویرایش حدیث',
            hadis: hadis
        });
    } catch (err) {
        req.session.message = {
            type: 'danger',
            message: 'حدیث یافت نشد!'
        };
        res.redirect('/hadis');
    }
});

router.put('/hadis/:id', async (req, res) => {
    try {
        await Hadis.findByIdAndUpdate(req.params.id, {
            number: req.body.number,
            title: req.body.title,
            dari: req.body.dari,
            pashto: req.body.pashto,
            english: req.body.english,
        });

        req.session.message = {
            type: 'success',
            message: 'حدیث موفقانه ویرایش شد!'
        };
        res.redirect('/hadis');
    } catch (err) {
        console.error('Error updating hadis:', err);
        req.session.message = {
            type: 'danger',
            message: 'خطا در ویرایش حدیث!'
        };
        res.redirect('/hadis');
    }
});


router.get('/hadis/detail/:id', async (req, res) => {
    try {
        const hadis = await Hadis.findById(req.params.id);
        if (!hadis) {
            req.session.message = {
                type: 'danger',
                message: 'حدیث پیدا نشد!'
            };
            return res.redirect('/hadis');
        }

        res.render('hadis-detail', {
            title: 'جزئیات حدیث',
            hadis
        });
    } catch (err) {
        console.error('Error fetching hadis:', err);
        req.session.message = {
            type: 'danger',
            message: 'خطا در دریافت حدیث!'
        };
        res.redirect('/hadis');
    }
});




module.exports = router;