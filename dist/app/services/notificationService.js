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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNoti = void 0;
const axios_1 = __importDefault(require("axios"));
const app_1 = require("../config/app");
const sendNoti = (title, message, userIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("https://onesignal.com/api/v1/notifications", {
            app_id: app_1.oneSignal.appId,
            include_external_user_ids: userIds,
            headings: {
                en: title,
            },
            contents: {
                en: message,
            },
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${app_1.oneSignal.appToken}`,
            },
        });
        console.log("Notification sent successfully:", response.data);
    }
    catch (error) {
        console.error("Error one Signal push noti:", error.response ? error.response.data : error.message);
    }
});
exports.sendNoti = sendNoti;
