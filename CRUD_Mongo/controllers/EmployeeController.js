const Employee = require("../models/EmployeeModel");
const User = require("../models/UserModel");


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

const testingTransaction = async (req,res) =>{
    // console.log(conn);
    const conn = require("../index");
    console.log("================",typeof conn.startSession);
    const session = await conn.startSession();
    try{
        session.startTransaction();
        let employeeName = req.body.name;
        await Employee.updateOne({name:employeeName},{email:`${employeeName.split(" ")[0]}@gmail.com`},{session});
        
        let newUser = new User({
            name: "Random1",
            val:"Re",
            newVa:4132412341234123
        })
        console.log("Update Worked");
        await newUser.save({session});
        await session.commitTransaction();
        console.log("Save Worked");
        res.status(200).json({message:"Email updated"});
    } catch(err){
        console.log(err);
        await session.abortTransaction();
        res.json({err});
    }
    session.endSession();
}


module.exports = {
    index, show, store, update, destroy,testingTransaction
}