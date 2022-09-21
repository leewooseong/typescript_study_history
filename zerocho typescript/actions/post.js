"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPost = void 0;
const addPost = (data) => {
    return {
        type: 'ADD_POST',
        data,
    };
};
exports.addPost = addPost;
exports.default = {
    addPost: exports.addPost,
};
