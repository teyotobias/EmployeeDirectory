var express = require('express');
var router = express.Router();
var employeeCtrl = require('../controller/employees');
//routes: GETS ALWAYS GO FIRST

//need get for index
//need get for new (works with create)
//need get for show
//need get for edit (works with update)
//need put for update(works with edit)
//need post for create
//need delete for delete

//RESTful routes notes: https://ga-students.slack.com/files/U046FNY6CN7/F05DA1G7E3X/screen_shot_2023-06-20_at_10.54.47_am.png
router.get('/', employeeCtrl.index)

router.get('/new', employeeCtrl.new);

router.get('/clocked-in', employeeCtrl.showClockedIn);

router.get('/:id/edit', employeeCtrl.edit);

router.get('/:id', employeeCtrl.show);

router.post('/', employeeCtrl.create);

router.delete('/:id', employeeCtrl.delete);

router.put('/:id', employeeCtrl.update);

router.post('/:id/clockIn', employeeCtrl.clockIn);

router.post('/:id/clockOut', employeeCtrl.clockOut);




module.exports = router;
