"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, request, response, next) => {
    if (error.status) {
        response.status(error.status).json({ error: error.message });
    }
    else if (error.message) {
        response.status(400).json({ error: error.message });
    }
    else {
        response.status(500).json({ error: error.message });
    }
    next();
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map