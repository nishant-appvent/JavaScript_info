const router = require('express').Router();
const CustomerController = require('../controllers/customerController')
const MerchantController = require('../controllers/merchantController')
const AdminController = require('../controllers/adminController')
const jwtMiddleware = require('../middlewares/auth')

router.get('/test',(req,res)=>{
    res.send("testing route");
})  

//admin routes
router.post('/adminLogin',AdminController.loginAdmin);
router.get('/getMerchants',jwtMiddleware.adminLoginJWT,AdminController.showAllMerchant);
router.get('/getCustomers',jwtMiddleware.adminLoginJWT,AdminController.showAllCustomers);
router.post('/verifyMerchant',jwtMiddleware.adminLoginJWT,AdminController.verifyMerchant);
router.put('/blockMerchant',jwtMiddleware.adminLoginJWT,AdminController.blockMerchant);
router.put('/blockCustomer',jwtMiddleware.adminLoginJWT,AdminController.blockCustomer);
router.put('/blockProduct',AdminController.blockProduct);

// merchant routes
router.post('/merchantreg',MerchantController.merchantReg);
router.post('/setPassword',jwtMiddleware.setPasswordJWT,MerchantController.setPassword);
router.post('/merchantLogin',MerchantController.merchantLogin);
router.post('/addProduct',jwtMiddleware.merchantLoginJWT,MerchantController.addProduct);
router.put('/updateProduct',jwtMiddleware.merchantLoginJWT,MerchantController.updateProduct);
router.put('/deleteProduct',jwtMiddleware.merchantLoginJWT,MerchantController.deleteProduct);

// customer routes
router.post('/regCustomer',CustomerController.registerCustomer);
router.post('/sendotp',CustomerController.sendOtp);
router.post('/verifyotp',jwtMiddleware.otpJWT,CustomerController.verifyOtp);
router.post('/loginCustomer',CustomerController.loginCustomer);
router.post('/customerAddress',jwtMiddleware.userLoginJWT,CustomerController.customerAddress);
module.exports = router;