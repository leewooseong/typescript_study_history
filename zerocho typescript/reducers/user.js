"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = {
    isLoggingIn: false,
    data: null,
};
const userReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return Object.assign(Object.assign({}, prevState), { data: action.data });
        case 'LOG_OUT':
            return Object.assign(Object.assign({}, prevState), { data: null });
        default:
            return prevState;
    }
};
exports.default = userReducer;
