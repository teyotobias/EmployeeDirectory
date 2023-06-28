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
router.get('/', employeeCtrl.index) //1

router.get('/new', employeeCtrl.new); //2 works with create

router.get('/clocked-in', employeeCtrl.showClockedIn);

router.get('/:id/edit', employeeCtrl.edit); //works with update

router.get('/:id', employeeCtrl.show); //3

router.post('/', employeeCtrl.create); //works with new

router.delete('/:id', employeeCtrl.delete);

router.put('/:id', employeeCtrl.update); //works with edit

router.post('/:id/clockIn', employeeCtrl.clockIn);

router.post('/:id/clockOut', employeeCtrl.clockOut);




module.exports = router;
