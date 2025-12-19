const { register } = require('./authController/userController/register');
const { login } = require('./authController/userController/login');
const { logout } = require('./authController/userController/logout');

const {changePassword} = require('./authController/passwordController/changePassword');
const {resetPassword} = require('./authController/passwordController/resetPassword');
const {updatePassword} = require('./authController/passwordController/updatePassword');

const {createEvent}=require('./eventController/createEvent');
const {myEventList}=require('./eventController/list/myEventList');
const {invitedList}=require('./eventController/list/invitedList');

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
    myEventList,
    invitedList
};

module.exports = {
    authController,
    passwordController,
    eventController
};
