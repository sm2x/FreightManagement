var express = require('express');

var router = express.Router();

const USER = require('../../controllers/admin/User');
const USER_PERMISSIONS = require('../../controllers/admin/UserPermissions');

router.get('/users', USER.viewAllUsers);
router.get('/users/:id', USER.viewUserById);

router.post('/user-permissions', USER_PERMISSIONS.addPermissions);

module.exports = router;