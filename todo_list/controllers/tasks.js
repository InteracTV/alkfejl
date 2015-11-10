var express = require('express');

var router = express.Router();

//Viewmodel réteg
var statusTexts = {
    '3': 'Fontos',
    '2': 'Még ma',
    '1': 'Ha van időd',
    '0': 'Kész',
};
var statusClasses = {
    '3': 'danger',
    '2': 'info',
    '1': 'warning',
    '0': 'success',
};
function decorateErrors(errorContainer) {
    return errorContainer.map(function (e) {
        e.statusText = statusTexts[e.status];
        e.statusClass = statusClasses[e.status];
        return e;
    });
}

router.get('/list', function (req, res) {
    req.app.models.task.find().then(function (errors) {
        console.log(errors);

        //megjelenítés
        res.render('tasks/list', {
            errors: decorateErrors(errors),
            messages: req.flash('info')
        });
    });
});
router.get('/new', function (req, res) {
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
    res.render('tasks/new', {
        validationErrors: validationErrors,
        data: data,
    });
});
router.get('/update/:id', function(req, res) {
    var id = req.params.id;
    req.app.models.task.findOne({
            id: id
        })
        .then(function(task) {
            res.render('tasks/new', {
                task:task
            });
        });
});
router.post('/update/:id', function (req, res) {
    var id = req.params.id;
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
        res.redirect('/tasks/new/:id');
    }
    else {
        // adatok elmentése (ld. később) és a hibalista megjelenítése
        req.app.models.task.findOne({
            id: id
        })
        .then(function(task){
            req.app.models.task.update(task, {
                status: req.body.statusz,
                location: req.body.helyszin,
                description: req.body.leiras
            })
            .then(function(task) {
                //siker
                req.flash('info', 'Feladat sikeresen frissítve!');
                res.redirect('/tasks/list');
            })
            .catch(function (err) {
                //hiba
                console.log(err);
            });
        });
    }
});
router.get('/delete/:id', function(req, res) {
    var id = req.params.id;
    req.app.models.task.destroy({id: id})
        .then(function (deletedErrors) {
            res.redirect('/tasks/list');
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
        res.redirect('/tasks/new');
    }
    else {
        // adatok elmentése (ld. később) és a hibalista megjelenítése
        req.app.models.task.create({
            status: req.body.statusz,
            location: req.body.helyszin,
            description: req.body.leiras
        })
        .then(function (error) {
            //siker
            req.flash('info', 'Feladat sikeresen felvéve!');
            res.redirect('/tasks/list');
        })
        .catch(function (err) {
            //hiba
            console.log(err);
        });
    }
});

module.exports = router;