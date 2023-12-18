"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', user_route_1.userRoute);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        messege: 'aip not found!',
    });
});
app.use((err, req, res, next) => {
    if (err) {
        res.status(err.status || 500).json({
            success: false,
            messege: err.message || 'Unknown Error!',
            error: {
                code: err.status || 500,
                description: err.message || 'Unknown Error!',
            },
        });
    }
});
exports.default = app;
