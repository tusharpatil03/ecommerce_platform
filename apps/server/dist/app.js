"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({
        message: "Hello",
        status: 200
    });
});
const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, (error) => {
    if (error) {
        console.log(error.message);
    }
    else {
        console.log(`server ready at http://${SERVER_HOST}:${SERVER_PORT}/`);
    }
});
