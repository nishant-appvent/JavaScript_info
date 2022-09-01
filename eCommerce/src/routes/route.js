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
router.put('/blockProduct',jwtMiddleware.adminLoginJWT,AdminController.blockProduct);

// merchant routes
router.post('/merchantreg',MerchantController.merchantReg);
router.post('/setPassword',jwtMiddleware.setPasswordJWT,MerchantController.setPassword);
router.post('/merchantLogin',MerchantController.merchantLogin);
router.post('/addProduct',jwtMiddleware.merchantLoginJWT,MerchantController.addProduct);
router.put('/updateProduct',jwtMiddleware.merchantLoginJWT,MerchantController.updateProduct);
router.delete('/deleteProduct',jwtMiddleware.merchantLoginJWT,MerchantController.deleteProduct);
router.get('/getMerchantProducts',jwtMiddleware.merchantLoginJWT,MerchantController.getMerchantProducts);

// customer routes
router.post('/regCustomer',CustomerController.registerCustomer);
router.post('/sendotp',CustomerController.sendOtp);
router.post('/verifyotp',jwtMiddleware.otpJWT,CustomerController.verifyOtp);
router.post('/loginCustomer',CustomerController.loginCustomer);
router.post('/customerAddress',jwtMiddleware.userLoginJWT,CustomerController.customerAddress);
router.post('/addToCart',jwtMiddleware.userLoginJWT,CustomerController.addToCart);
router.post('/orderDetails',jwtMiddleware.userLoginJWT,CustomerController.orderDetails);
router.get('/cartDetails',jwtMiddleware.userLoginJWT,CustomerController.cartDetails);
router.post('/orderProducts',jwtMiddleware.userLoginJWT,CustomerController.orderProducts);
router.delete('/removeFromCart',jwtMiddleware.userLoginJWT,CustomerController.removeFromCart);

// public
router.get('/getAllProducts',CustomerController.getAllProducts);

module.exports = router;