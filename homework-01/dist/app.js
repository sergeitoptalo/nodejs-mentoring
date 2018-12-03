"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_json_1 = __importDefault(require("./config/appConfig.json"));
const models_1 = require("./models");
console.log(appConfig_json_1.default.name);
new models_1.User();
new models_1.Product();
//# sourceMappingURL=app.js.map