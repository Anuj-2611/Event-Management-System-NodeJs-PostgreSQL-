module.exports =(message) => {
        const messages = {
            'USER_NOT_FOUND': 'User not found',
            'OLD_PASSWORD_INCORRECT': 'Old password is incorrect',
            'PASSWORD_CHANGED_SUCCESS': 'Password changed successfully',
            'PASSWORD_RESET_SUCCESS': 'Password reset successfully',
            'UNAUTHORIZED': 'Unauthorized',
            'SERVER_ERROR': 'Server error',
            'LOGIN_SUCCESS': 'Login successful',
            'LOGOUT_SUCCESSFUL': 'Logout successful',
            'LOGOUT_FAIL': 'Logout failed'
        };
        return messages[message] || String(message);
    
};