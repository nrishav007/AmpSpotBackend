"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const index_1 = require("../../utils/index");
const message_dal_1 = require("./message.dal");
class MessageClass {
    constructor() { }
    createMessage(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, djId, message, userType } = req.body;
            const messageDataCreate = {
                userId,
                djId,
                message,
                userType
            };
            const messageData = yield message_dal_1.Dal.createMessage(messageDataCreate);
            const result = new index_1.VirifiResult(200, 'Message Created', { messageData });
            return result;
        });
    }
    getUserMessageList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageList = yield message_dal_1.Dal.getUserMessageList(req.params.id);
            const result = new index_1.VirifiResult(200, 'Get User Message List', { messageList });
            return result;
        });
    }
    getDjMessageList(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageList = yield message_dal_1.Dal.getDjMessageList(req.params.id);
            const result = new index_1.VirifiResult(200, 'Get Dj Message Lsit', { messageList });
            return result;
        });
    }
    allMessage(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, djId } = req.body;
            const messages = yield message_dal_1.Dal.findAllMessage(userId, djId);
            const result = new index_1.VirifiResult(200, 'User Dj Messages', { messages });
            return result;
        });
    }
    updateMessage(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { messageId, reaction } = req.body;
            const messageDataCreate = {
                _id: messageId,
                reaction
            };
            const messageData = yield message_dal_1.Dal.updateMessageById(messageDataCreate);
            const result = new index_1.VirifiResult(200, 'Reaction Updated', { messageData });
            return result;
        });
    }
}
exports.Controller = new MessageClass();
//# sourceMappingURL=message.controller.js.map