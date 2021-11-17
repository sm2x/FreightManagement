var express = require('express');

var router = express.Router();

const EMPLOYEE = require('../../controllers/company/Employee');

router.post('/employee/register', EMPLOYEE.register);

module.exports = router;