"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DjOfWeekDal = exports.DjOfWeekSchema = exports.DjOfWeekController = exports.DjOfWeekRouter = void 0;
var djOfWeek_routes_1 = require("./djOfWeek.routes");
Object.defineProperty(exports, "DjOfWeekRouter", { enumerable: true, get: function () { return djOfWeek_routes_1.router; } });
var djOfWeek_controller_1 = require("./djOfWeek.controller");
Object.defineProperty(exports, "DjOfWeekController", { enumerable: true, get: function () { return djOfWeek_controller_1.Controller; } });
var djOfWeek_model_1 = require("./djOfWeek.model");
Object.defineProperty(exports, "DjOfWeekSchema", { enumerable: true, get: function () { return djOfWeek_model_1.DjOfWeek; } });
var djOfWeek_dal_1 = require("./djOfWeek.dal");
Object.defineProperty(exports, "DjOfWeekDal", { enumerable: true, get: function () { return djOfWeek_dal_1.Dal; } });
//# sourceMappingURL=index.js.map