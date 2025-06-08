"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkReplicaSet = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const checkReplicaSet = async () => {
    try {
        const adminDb = mongoose_1.default.connection.db?.admin();
        const result = await adminDb?.command({
            hello: 1
        });
        if (!result) {
            return false;
        }
        if ("hosts" in result && "setName" in result) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        throw new Error("Error in checking replica set");
    }
};
exports.checkReplicaSet = checkReplicaSet;
