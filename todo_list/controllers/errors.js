var express = require('express');

var router = express.Router();

//Viewmodel réteg
var statusTexts = {
    'new': 'Fontos',
    'assigned': 'Még ma',
    'ready': 'Kész',
    'rejected': 'Ha ráérsz',
    'pending': 'Felfüggesztve',
};
var statusClasses = {
    'new': 'danger',
    'assigned': 'info',
    'ready': 'success',
    'rejected': 'default',
    'pending': 'warning',
};
function decorateErrors(errorContainer) {
    return errorContainer.map(function (e) {
        e.statusText = statusTexts[e.status];
        e.statusClass = statusClasses[e.status];
        return e;
    });
}

router.get('/list', function (req, res) {
    req.app.models.error.find().then(function (errors) {
        console.log(errors);

        //megjelenítés
        res.render('errors/list', {
            errors: decorateErrors(errors),
            messages: req.flash('info')
        });
    });
});
router.get('/new', function (req, res) {
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
    res.render('errors/new', {
        validationErrors: validationErrors,
        data: data,
    });
});
router.post('/new', function (req, res) {
    // adatok ellenőrzése
    req.checkBody('helyszin', 'Hibás helyszín').notEmpty().withMessage('Kötelező megadni!');
    req.sanitizeBody('leiras').escape();
    req.checkBody('leiras', 'Hibás leírás').notEmpty().withMessage('Kötelező megadni!');
    
    var validationErrors = req.validationErrors(true);
    console.log(validationErrors);
    console.log(req.body);
    
    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/errors/new');
    }
    else {
        // adatok elmentése (ld. később) és a hibalista megjelenítése
        req.app.models.error.create({
            status: 'new',
            location: req.body.helyszin,
            description: req.body.leiras
        })
        .then(function (error) {
            //siker
            req.flash('info', 'Feladat sikeresen felvéve!');
            res.redirect('/errors/list');
        })
        .catch(function (err) {
            //hiba
            console.log(err);
        });
    }
});

module.exports = router;