const Employee = require("../models/EmployeeModel");

// Show the list of Employees
const index = (req,res,next) =>{
    Employee.find().then(response=>{
        res.json({
            response
        })
    }).catch(error=>{
        res.json({
            message:"An Error Occured!"
        })
    })
}

// Show Employee By id
const show = (req,res,next) =>{
    let employeeID = req.body.employeeID;
    Employee.findById(employeeID).then(response=>{
        res.json({
            response
        })
    }).catch(error=>{
        res.json({
            message:"An Error Occured!"
        })
    })
}

// Create an Employee
const store = (req,res,next) =>{
    console.log(req.body);
    let employee = new Employee({
        name: req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age
    })
    if(req.files){
        let path = '';
        req.files.forEach(function(file,index,arr){
            path  += file.path + ',';
        });
        path = path.substring(0,path.lastIndexOf(','));
        employee.avatar = path;
    }
    employee.save().then(response =>{
        res.json({
            message : 'Employee Added Successfully'
        })
    }).catch(error=>{
        res.json({
            message:"An Error Occured!"
        })
    })
}

// Update an Employee
const update = (req,res,next) =>{
    let employeeID = req.body.employeeID;

    let updateData = {
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age 
    }

    Employee.findByIdAndUpdate(employeeID, {$set:updateData}).then(()=>{
        res.json({
            message:'Employee updated successfully!'
        })
    })
}

// delete an employee
const destroy = (req,res,next)=>{
    let employeeID = req.body.employeeID;
    Employee.findByIdAndRemove(employeeID).then(()=>{
        res.json({
            message:"Employee deleted Successfully"
        })
    }).catch(error=>{
        res.json({
            message:'An Error Occured!'
        })
    })
}


module.exports = {
    index, show, store, update, destroy
}