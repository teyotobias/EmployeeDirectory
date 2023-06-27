const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    department: {type: String, required: true},
    position: {type: String, required: true},
    hourlyWage: {type: Number, required: true, min: 8, max: 250},
    yearlyWage: {type: Number, required: true, min: 25000, max: 250000},
    hired: {type: Date, required: true},
    DOB: {type: Date, required: true},
    present: {type: Boolean, default: false}
})


module.exports = mongoose.model('employee', employeeSchema);