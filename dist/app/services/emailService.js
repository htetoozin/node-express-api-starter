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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const markdown_it_1 = __importDefault(require("markdown-it"));
const mail_1 = require("../config/mail");
const md = new markdown_it_1.default({
    html: true,
    linkify: true,
    typographer: true,
});
const htmlTemplate = ({ name, title, description, }) => {
    return `
<div style="text-align: center;">
  <h1>🚀 ${title} 🚀</h1>
  <p>Hello ${name},</p>
  <p>${description}</p>
</div>

<hr/>

<div style="text-align: center;">
  <p>Made With ❤️ by <strong>Htet Oo Zin</strong></p>
</div>
`;
};
/**
 * Send email
 *
 * @param email
 * @param subject
 * @param title
 * @param description
 */
const sendEmail = (email_1, subject_1, ...args_1) => __awaiter(void 0, [email_1, subject_1, ...args_1], void 0, function* (email, subject, name = "John Doe", title = "Welcome to Node Express Typescript Starter!", description = "Welcome to Node Description") {
    const htmlContent = md.render(htmlTemplate({ name, title, description }));
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: mail_1.mail.host,
            port: mail_1.mail.port,
            secure: mail_1.mail.secure,
            auth: {
                user: mail_1.mail.username,
                pass: mail_1.mail.password,
            },
        });
        const info = yield transporter.sendMail({
            from: mail_1.mail.address,
            to: email,
            subject,
            text: description,
            html: htmlContent,
        });
        console.log("Email sent successfully", info.messageId);
        return info;
    }
    catch (error) {
        console.log(error, "error");
    }
});
exports.sendEmail = sendEmail;
