var express = require('express');

var router = express.Router();

const FREIGHT = require('../../controllers/users/Freight');
const TRUCK = require('../../controllers/users/Truck');

router.post('/freight', FREIGHT.addNewFreight);
router.get('/all-freights/:user_id', FREIGHT.viewAllFreights);
router.get('/freight/:id', FREIGHT.viewFreightById);
router.put('/freight/:id', FREIGHT.editFreight);
router.delete('/freight/:id', FREIGHT.deleteFreight);

router.post('/truck-journey', TRUCK.addFreightJourney);
router.get('/all-truck-journeys/:user_id', TRUCK.viewAllTruckJourneys);
router.get('/truck-journey/:id', TRUCK.viewTruckJourneyById);
router.put('/truck-journey/:id', TRUCK.editTruckJourney);
router.delete('/truck-journey/:id', TRUCK.deleteTruckJourney);

module.exports = router;