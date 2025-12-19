const auth = require('../controller/index').authController;
const passwordAuth = require('../controller/index').passwordController;
const eventAuth = require('../controller/index').eventController;
const express = require('express');
const router = express.Router();

router.post('/login', auth.login);
router.post('/register', auth.register);
router.post('/logout', auth.logout);

router.post('/change-password', passwordAuth.changePassword);
router.post('/reset-password', passwordAuth.resetPassword);
router.post('/update-password', passwordAuth.updatePassword);

router.post('/create-event', eventAuth.createEvent);
router.get('/my-events', eventAuth.myEventList);
router.get('/invited-events', eventAuth.invitedList);


module.exports = router;