const Employee = require('../models/employee');

//need get for index
//need get for new (works with create)
//need get for show
//need get for edit (works with update)
//need put for update(works with edit)
//need post for create
//need delete for delete

//RESTful routes notes: https://ga-students.slack.com/files/U046FNY6CN7/F05DA1G7E3X/screen_shot_2023-06-20_at_10.54.47_am.png

//try-catch in create, delete, and update
//use await whenever fetching something from db or creating something on db
//all functions besides "new" async


module.exports = {
    index,
    show,
    new: newEmployee,
    create,
    delete: fireEmployee,
    edit,
    update,
    clockIn,
    clockOut,
    showClockedIn
}

async function index(req,res) {
    try {
        const allEmployees = await Employee.find({});
        res.render('employees/index', {
            title: 'All Employees',
            employees: allEmployees
        })
    }
    catch(err) {
        console.log(err);
        
    }
}
function newEmployee(req,res) {
    res.render('employees/new', {
        title: "Add Employee",
        errorMsg: ''
    });
}
async function create(req, res) {
    try {
        await Employee.create(req.body);
        res.redirect('/employees');
    }
    catch(err) {
        res.redirect('/employees/new', {errMsg: err.message});
    }
}

async function fireEmployee(req,res) {
    try {
        const firedEmp = await Employee.findByIdAndRemove(req.params.id);
        if(!firedEmp) {
            return res.status(404).send('No superhero found with this id');
        }
        else {
            console.log(`${firedEmp.name} has been fired`);
            res.redirect('/employees');
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).send('Servor error');
    }
}





async function show(req,res) {
    try {
        const selectEmployee = await Employee.findById(req.params.id);
        // check if the selectEmployee or its properties are not undefined
        if (!selectEmployee || !selectEmployee.hired || !selectEmployee.DOB) {
            console.log('Employee or one of its properties is undefined');
            return res.redirect('/employees');
        }
        res.render('employees/show', {
            title: 'Employee Details',
            employee: selectEmployee
        });
    } catch(err) {
        console.error(err);
        res.redirect('/employees');
    }
}

async function edit(req,res) {
    try {
        const selectEmp = await Employee.findById(req.params.id);
        if(!selectEmp) {
            console.log(`Employee ${selectEmp} not found`);
            return res.status(404).send('No emplpoyee found with this id');
        }
        res.render('employees/edit', {
            title: 'Edit Employee',
            employee: selectEmp
        });
    }
    catch(err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
}

async function update(req,res) {
    try {
        const selectEmp = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!selectEmp){
            console.log(`Employee ${selectEmp} not found`);
            return res.status(500).send('No employee found with this id');
        }
        else {
            console.log(selectEmp);
            return res.redirect(`/employees/${selectEmp.id}`);
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
}

async function clockIn(req,res) {
    try {
        const selectEmp = await Employee.findById(req.params.id);
        if(!selectEmp) {
            console.log(`Employee ${selectEmp} not found`);
            return res.status(404).send('No employee found with this id');
        }
        else {
            if(selectEmp.present == true) {
                return res.status(400).send('Employee is already clocked in');
            }
            selectEmp.present = true;
            await selectEmp.save();
            console.log(`${selectEmp} has been clocked in`);
            return res.redirect(`/employees/${selectEmp.id}`);
            //change where it redirects once signed in page is created
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
}

async function clockOut(req,res) {
    try {
        const selectEmp = await Employee.findById(req.params.id);
        if(!selectEmp) {
            console.log(`Employee ${selectEmp} not found`);
            return res.status(404).send('No employee found with this id');
        }
        else {
            if (selectEmp.present == false) {
                return res.status(400).send('Employee is already clocked out');
            }
            selectEmp.present = false;
            await selectEmp.save();
            console.log(`${selectEmp.name} has been clocked out`);
            return res.redirect(`/employees/${selectEmp.id}`);
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
}

async function showClockedIn(req,res) {
    try {
        const employees = await Employee.find({present: true});
        const numPresent = employees.length;
        res.render('employees/clocked-in', {
            employees,
            numPresent,
            title: 'On Staff'
        });
    }
    catch(err) {
        console.log(err);
        res.redirect('/');
    }
}