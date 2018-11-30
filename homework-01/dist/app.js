"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_json_1 = __importDefault(require("./config/appConfig.json"));
var models = require('./models');
console.log(appConfig_json_1.default.name);
const user = new models.User();
const product = new models.Product();
//# sourceMappingURL=app.js.map