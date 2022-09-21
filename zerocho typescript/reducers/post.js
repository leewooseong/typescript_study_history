"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const initialState = [];
const postReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return [...prevState, action.data];
        default:
            return prevState;
    }
};
exports.default = postReducer;
