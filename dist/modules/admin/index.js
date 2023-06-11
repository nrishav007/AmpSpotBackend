"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDal = exports.AdminSchema = exports.AdminController = exports.AdminRouter = void 0;
var admin_routes_1 = require("./admin.routes");
Object.defineProperty(exports, "AdminRouter", { enumerable: true, get: function () { return admin_routes_1.router; } });
var admin_controller_1 = require("./admin.controller");
Object.defineProperty(exports, "AdminController", { enumerable: true, get: function () { return admin_controller_1.Controller; } });
var admin_model_1 = require("./admin.model");
Object.defineProperty(exports, "AdminSchema", { enumerable: true, get: function () { return admin_model_1.Admin; } });
var admin_dal_1 = require("./admin.dal");
Object.defineProperty(exports, "AdminDal", { enumerable: true, get: function () { return admin_dal_1.Dal; } });
//# sourceMappingURL=index.js.map