"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageDal = exports.MessageSchema = exports.MessageController = exports.MessageRouter = void 0;
var message_routes_1 = require("./message.routes");
Object.defineProperty(exports, "MessageRouter", { enumerable: true, get: function () { return message_routes_1.router; } });
var message_controller_1 = require("./message.controller");
Object.defineProperty(exports, "MessageController", { enumerable: true, get: function () { return message_controller_1.Controller; } });
var message_model_1 = require("./message.model");
Object.defineProperty(exports, "MessageSchema", { enumerable: true, get: function () { return message_model_1.Message; } });
var message_dal_1 = require("./message.dal");
Object.defineProperty(exports, "MessageDal", { enumerable: true, get: function () { return message_dal_1.Dal; } });
//# sourceMappingURL=index.js.map