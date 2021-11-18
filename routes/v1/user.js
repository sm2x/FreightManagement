var express = require('express');

var router = express.Router();

const TRUCK = require('../../controllers/users/Truck');
const FREIGHT = require('../../controllers/users/Freight');

router.post('/truck-journey', TRUCK.addFreightJourney);

router.post('/freight', FREIGHT.addNewFreight);

module.exports = router;