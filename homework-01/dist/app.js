"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig_json_1 = __importDefault(require("./config/appConfig.json"));
const models = __importStar(require("./models"));
const { User, Product } = models.default;
console.log(appConfig_json_1.default.name);
const user = new User();
const product = new Product();
//# sourceMappingURL=app.js.map