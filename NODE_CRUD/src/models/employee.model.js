var dbConn = require('../../config/db.config');

var Employee = function(employee){
    this.first_name = employee.first_name;
    this.last_name = employee.last_name;
    this.mail = employee.mail;
    this.phone = employee.phone;
    this.organisation = employee.organisation;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.status = employee.status ? employee.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();   
}


// get all employees 
Employee.getAllEmployees = (result) =>{
    dbConn.query('SELECT * FROM employees',(err,res)=>{
        if(err){
            console.log('Error while fetching employee',err);
            result(null,err);
        }
        else{
            console.log('Employees fetched successfully');
            result(null,res);
        }
    })
}

// get employee by ID from DB

Employee.getEmployeeByID = (id,result)=>{
    dbConn.query('SELECT * FROM employees WHERE id=?',id,(err,res)=>{
        if(err){
         console.log('Error while fetching Employee by id',err);
         result(null,err);   
        }
        else{
            result(null,res);
        }
    })
}

// create new employee
Employee.createEmployee = (employeeReqData,result)=>{
    dbConn.query(' INSERT INTO employees SET ? ',employeeReqData,(err,res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null,err);
        }else{
            console.log('Employee added successfully');
            result(null,res)
        }
    })
}

// update employee

Employee.updateEmployee = (id, employeeReqData,result) =>{
    dbConn.query('UPDATE employees SET first_name=?,last_name=?,mail=?,phone=?,organisation=?,designation=?,salary=?,status=? WHERE id=?',[employeeReqData.first_name,employeeReqData.last_name,employeeReqData.mail,employeeReqData.phone,employeeReqData.organisation,employeeReqData.designation,employeeReqData.salary,employeeReqData.status,id],(err,res)=>{
        if(err){
            console.log("Error While Updating the Employee data");
            result(null,err);
        }
        else{
            console.log("Employee updated successfully");
            result(null,res);
        }
    });
}


// delete employee
Employee.deleteEmployee = (id,result)=>{
    // dbConn.query('DELETE FROM employees WHERE id=?',[id],(err,res)=>{
    //     if(err){
    //         console.log("Error while deleting Employee");
    //         result(null,err);
    //     }
    //     else{
    //         result(null,res);  
    //     }
    // })
    dbConn.query('UPDATE employees SET is_deleted=? WHERE id=?',[1,id],(err,res)=>{
        if(err){
            console.log("Error While Deleting the Employee data");
            result(null,err);
        }
        else{
            console.log("Employee deleted successfully");
            result(null,res);
        }
    });
    
}


module.exports = Employee;

