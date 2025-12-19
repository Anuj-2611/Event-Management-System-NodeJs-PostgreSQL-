const { register } = require('./authController/userController/register');
const { login } = require('./authController/userController/login');
const { logout } = require('./authController/userController/logout');

const {changePassword} = require('./authController/passwordController/changePassword');
const {resetPassword} = require('./authController/passwordController/resetPassword');
const {updatePassword} = require('./authController/passwordController/updatePassword');

const {createEvent}=require('./eventController/createEvent');
const {eventInvite}=require('./eventController/eventInvite')
const {myEventList}=require('./eventController/list/myEventList');
const {invitedList}=require('./eventController/list/invitedList');
const {eventDetails}=require('./eventController/eventDetails');
const {updateEvent}=require('./eventController/updateEvent');

const authController = {
    register,
    login,
    logout
};

const passwordController = {
    changePassword,
    resetPassword,
    updatePassword
};

const eventController = {
    createEvent,
    eventInvite,
    myEventList,
    invitedList,
    eventDetails,
    updateEvent
};

module.exports = {
    authController,
    passwordController,
    eventController
};
