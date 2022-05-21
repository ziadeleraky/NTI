const router = require("express").Router();
const customerController = require("../app/controller/customer.controller");

router.get("/", customerController.home);

router.get('/add', customerController.addView);
router.get('/addLogic', customerController.addLogic);

router.get('/customers/addTransaction/:id', customerController.addTransactionView);
router.post('/customers/addTransaction/:id', customerController.addTransactionLogic);

router.get('/customers/:id', customerController.show);

router.get('/customers/del/:id', customerController.del)

router.get('*', customerController.err);
router.post('*', customerController.err);

module.exports = router;