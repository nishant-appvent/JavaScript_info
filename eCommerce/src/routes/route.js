const router = require('express').Router();
const CustomerController = require('../controllers/customerController')
const MerchantController = require('../controllers/merchantController')
const AdminController = require('../controllers/adminController')
const jwtMiddleware = require('../middlewares/auth')
const joiMiddleware = require('../middlewares/joiValidation')

router.get('/test',(req,res)=>{
    res.send("testing route");
})  

//admin routes
router.post('/adminLogin',joiMiddleware.loginValidation,AdminController.loginAdmin);
router.get('/getMerchants',jwtMiddleware.adminLoginJWT,AdminController.showAllMerchant);
router.get('/getCustomers',jwtMiddleware.adminLoginJWT,AdminController.showAllCustomers);
router.post('/verifyMerchant',jwtMiddleware.adminLoginJWT,AdminController.verifyMerchant);
router.put('/blockMerchant',jwtMiddleware.adminLoginJWT,AdminController.blockMerchant);
router.put('/blockCustomer',jwtMiddleware.adminLoginJWT,AdminController.blockCustomer);
router.put('/blockProduct',jwtMiddleware.adminLoginJWT,AdminController.blockProduct);

// merchant routes
router.post('/merchantreg',MerchantController.merchantReg);
router.post('/setPassword',jwtMiddleware.setPasswordJWT,MerchantController.setPassword);
router.post('/merchantLogin',joiMiddleware.loginValidation,MerchantController.merchantLogin);
router.post('/addProduct',jwtMiddleware.merchantLoginJWT,MerchantController.addProduct);
router.put('/updateProduct',jwtMiddleware.merchantLoginJWT,MerchantController.updateProduct);
router.delete('/deleteProduct',jwtMiddleware.merchantLoginJWT,MerchantController.deleteProduct);
router.get('/getMerchantProducts',jwtMiddleware.merchantLoginJWT,MerchantController.getMerchantProducts);
router.post('/addSubCategory',jwtMiddleware.merchantLoginJWT,MerchantController.addSubCategory);
router.post('/addCategory',jwtMiddleware.merchantLoginJWT,MerchantController.addCategory);

// customer routes
router.post('/regCustomer',joiMiddleware.customerRegValidation,CustomerController.registerCustomer);
router.post('/sendotp',joiMiddleware.validationSendOtp,CustomerController.sendOtp);
router.post('/verifyotp',joiMiddleware.validationVerifyOtp,jwtMiddleware.otpJWT,CustomerController.verifyOtp);
router.post('/loginCustomer',joiMiddleware.loginValidation,CustomerController.loginCustomer);
router.post('/customerAddress',joiMiddleware.addressValidation,jwtMiddleware.userLoginJWT,CustomerController.customerAddress);
router.post('/addToCart',joiMiddleware.validationAddtoCart,jwtMiddleware.userLoginJWT,CustomerController.addToCart);
router.get('/orderDetails',jwtMiddleware.userLoginJWT,CustomerController.orderDetails);
router.get('/cartDetails',jwtMiddleware.userLoginJWT,CustomerController.getCartDetails);
router.post('/orderProducts',joiMiddleware.validationOrderProducts,jwtMiddleware.userLoginJWT,CustomerController.orderProducts);
router.delete('/removeFromCart',jwtMiddleware.userLoginJWT,CustomerController.removeFromCart);
router.post('/payment',jwtMiddleware.userLoginJWT,CustomerController.paymentAndOrder);

// public
router.get('/getAllProducts',CustomerController.getAllProducts);

module.exports = router;
// router.post('/Cart',CustomerController.addBulkCart);