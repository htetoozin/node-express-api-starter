"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const database_1 = require("./config/database");
const api_1 = __importDefault(require("./routes/api"));
const welcome_1 = __importDefault(require("./routes/welcome"));
const errorException_1 = __importDefault(require("./exceptions/errorException"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//Development Logging
if (process.env.APP_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
//Database connection
database_1.db.connection();
//Serve static files from the 'public' folder
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.json());
//Routes
app.use("/api", api_1.default);
app.use(welcome_1.default);
//Error Handler
// app.all("*", notFoundException);
app.use(errorException_1.default);
exports.default = app;
