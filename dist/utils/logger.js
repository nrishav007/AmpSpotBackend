"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
class Logger {
    constructor() { }
    info(...params) {
        console.log(...params);
    }
    error(...params) {
        console.log('Error Occurred');
        console.error(...params);
    }
}
exports.logger = new Logger();
//# sourceMappingURL=logger.js.map