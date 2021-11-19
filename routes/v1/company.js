var express = require('express');

var router = express.Router();

const COMPANY_PROFILE = require('../../controllers/company/CompanyProfile');
const EMPLOYEES = require('../../controllers/company/Employee');
const FREIGHT = require('../../controllers/company/Freight');
const TRUCK = require('../../controllers/company/Truck');

router.get('/my-profile/:id', COMPANY_PROFILE.getSelfProfile);

router.get('/employees/:cmpny_uid', EMPLOYEES.viewAllEmployees);
router.get('/employees/:cmpny_uid/:id', EMPLOYEES.viewEmployeeById);

router.get('/freights/:cmpny_uid', FREIGHT.viewAllFreights);
router.get('/freights/:cmpny_uid/:id', FREIGHT.viewFreightById);
router.get('/freights/:cmpny_uid/:user_id', FREIGHT.viewFreightByUser);

router.get('/trucks/:cmpny_uid', TRUCK.viewAllTrucks);
router.get('/trucks/:cmpny_id/:id', TRUCK.viewTruckById);

module.exports = router;