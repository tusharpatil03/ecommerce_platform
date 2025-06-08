"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = void 0;
require("dotenv/config");
const ENV = process.env;
exports.DATABASE_URL = ENV.DATABASE_URL;
