"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../controllers/auth/authController");
const forgotPasswordController_1 = require("../../controllers/auth/forgotPasswordController");
const router = (0, express_1.Router)();
//Unauthenticated
router.post("/register", authController_1.register);
router.post("/login", authController_1.login);
router.post("/forgot-password", forgotPasswordController_1.passwordReset);
exports.default = router;
