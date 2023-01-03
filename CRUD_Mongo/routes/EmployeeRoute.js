const express = require('express')
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')
const upload = require("../middleware/upload");

router.get('/',EmployeeController.index);
router.post('/show',EmployeeController.show);
router.post('/store',upload.array('avatar[]'),EmployeeController.store);
router.put('/update',EmployeeController.update);
router.delete('/destroy',EmployeeController.destroy);

module.exports = router;