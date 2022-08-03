
// get all Employee list

const Employee = require('../models/employee.model');
const EmployeeModel = require('../models/employee.model');

var User = function(userData){
    this.mail = userData.mail;
    this.phone = userData.phone;
}

exports.getEmployeeList = (req,res)=>{
    // console.log("All employees list");
    EmployeeModel.getAllEmployees((err,employees)=>{
        console.log("We are here.");
        if(err) 
        res.send(err);
        console.log('Employees',employees);
        res.send(employees);

    })
}


// get employee by id

exports.getEmployeeByID = (req,res)=>{
    // console.log("get Emp by id");
    EmployeeModel.getEmployeeByID(req.params.id,(err,employee)=>{
        if(err)
        res.send(err);
        console.log('Single employee data',employee);
        res.send(employee);
    })
}

// create new employee

exports.createNewEmployee = (req,res)=>{
    console.log('req data',req.body);
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData',employeeReqData)

    // check null
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        EmployeeModel.createEmployee(employeeReqData,(err,employee)=>{
            if(err)
                res.send(err);
                res.json({status:true,message:'Employee added successfully',data: employee})  
        })
    }
}

// Update Employee

exports.updateEmployee = (req,res)=>{
    console.log('req data',req.body);
    const employeeReqData = new EmployeeModel(req.body);
    console.log('employeeReqData update',employeeReqData)

    // check null
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data");
        EmployeeModel.updateEmployee(req.params.id,employeeReqData,(err,employee)=>{
            if(err)
                res.send(err);
                res.json({status:true,message:'Employee data updated successfully'})  
        })
    }
}


// delete employee 
exports.deleteEmployee = (req,res)=>{
    EmployeeModel.deleteEmployee(req.params.id, (err, employee)=>{
        if(err)
        res.send(err);
        res.json({success:true,message:"Employee deleted successfully!"});
    })
}


// login user

exports.loginUser = (req,res)=>{
    console.log('login data',req.body);
    const loginData = new User(req.body);
    console.log('login data ',loginData)

    // check null
    if((req.body.constructor===Object) && (Object.keys(req.body).length===0)){
        res.send(400).send({success:false,message:"Please fill all fields"});
    }
    else{
        console.log("valid data for login");
        EmployeeModel.loginUser(loginData,(err,employee)=>{
            if(err)
                res.send(err);
            if(Object.keys(employee).length){
                res.json({data:employee,message:'login successful'});
            }
            else{
                res.json({message:"Login Failed"});
            }  
        })
    }
}