const router = require('express').Router();

// Route pembeli
router.use('/', require('./buyer/auth/accountSetting'));
router.use('/', require('./buyer/auth/login'));
router.use('/', require('./buyer/auth/register'));
router.use('/', require('./buyer/auth/settingPassword'));
router.use('/', require('./buyer/cart'));
router.use('/', require('./buyer/costomAssembly'));
router.use('/', require('./buyer/costomPrototype'));
// router.use('/', require('./buyer/dashbord'));
router.use('/', require('./buyer/product'));
router.use('/', require('./buyer/transactions'));

// Route admin
router.use('/admin', require('./admin/auth/login'));
router.use('/admin', require('./admin/categories'));
router.use('/admin', require('./admin/costomAssembly'));
router.use('/admin', require('./admin/costomPrototype')); 
router.use('/admin', require('./admin/dashboard'));
router.use('/admin', require('./admin/product'));
router.use('/admin', require('./admin/requestCostomAssembly'));
router.use('/admin', require('./admin/requestCostomPrototype'));
router.use('/admin', require('./admin/transactions'));

// Route Service
router.use('/service', require('./services/rajaOngkir'));
router.use('/service', require('./services/payment'));


module.exports = router;
