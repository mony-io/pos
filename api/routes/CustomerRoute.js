const express = require('express');
const Customer = require('../controllers/CustomerController');
const router = express.Router();

router.post('/api/customer', Customer.create);
router.get('/api/cusquery', Customer.searchCustomerName);
router.get('/api/customers', Customer.findAll);
router.delete('/api/customers/:id', Customer.deleteById);
router.put('/api/customers/:id', Customer.update_customer);
router.get('/api/customers/:id', Customer.findById);

module.exports = router;
