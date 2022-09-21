"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.logIn = void 0;
const logIn = (data) => {
    return (dispatch, getState) => {
        dispatch(logInRequest(data));
        try {
            setTimeout(() => {
                dispatch(logInSuccess({
                    userId: 1,
                    nickname: 'zerocho'
                }));
            }, 2000);
        }
        catch (e) {
            dispatch(logInFailure(e));
        }
    };
};
exports.logIn = logIn;
const logInRequest = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    };
};
const logInSuccess = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    };
};
const logInFailure = (error) => {
    return {
        type: 'LOG_IN_FAILURE',
        error,
    };
};
const logOut = () => {
    return {
        type: 'LOG_OUT',
    };
};
exports.logOut = logOut;
exports.default = {
    logIn: exports.logIn,
    logOut: exports.logOut,
};
