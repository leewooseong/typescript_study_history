"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const user_1 = __importDefault(require("./user"));
const post_1 = __importDefault(require("./post"));
exports.default = (0, redux_1.combineReducers)({
    user: user_1.default,
    posts: post_1.default,
});
