"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require('express-async-errors');
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./modules/routes"));
require("./connections/mongodb");
const middlewares_1 = require("./middlewares");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3005;
app.use(express_1.default.static(__dirname + "/public"));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json());
app.use((0, express_fileupload_1.default)());
app.use('/api', routes_1.default);
app.use(middlewares_1.errorHandler);
app.listen(port, () => {
    console.log('Connect to server ', port);
});
//# sourceMappingURL=app.js.map