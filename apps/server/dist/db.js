"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const globals_1 = require("./globals");
const checkReplicaSet_1 = require("./utilities/checkReplicaSet");
let session;
const connect = async (dbName) => {
    if (mongoose_1.default.connection.readyState !== 0) {
        return;
    }
    try {
        await mongoose_1.default.connect(globals_1.DATABASE_URL, { dbName });
        const isReplicaSet = await (0, checkReplicaSet_1.checkReplicaSet)();
        if (isReplicaSet) {
            console.log("Session started --> Connected to a replica set!");
            session = await mongoose_1.default.startSession();
        }
        else {
            console.log("Session not started --> Not Connected to a replica set!");
        }
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
    }
};
exports.connect = connect;
