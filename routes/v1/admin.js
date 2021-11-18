var express = require('express');

var router = express.Router();

const USER_PERMISSIONS = require('../../controllers/admin/UserPermissions');

router.post('/user-permissions', USER_PERMISSIONS.addPermissions);

module.exports = router;