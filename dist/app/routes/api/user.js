"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const userController_1 = require("../../controllers/userController");
const router = (0, express_1.Router)();
//Unauthenticated
router.get("/users", userController_1.getUsers);
router.get("/users/:id", userController_1.getUser);
//Authenticated
router.post("/users", authMiddleware_1.auth, userController_1.createUser);
router.patch("/users/:id", authMiddleware_1.auth, userController_1.updateUser);
router.delete("/users/:id", authMiddleware_1.auth, userController_1.deleteUser);
//upload image
router.post("/users/:id/upload-image", authMiddleware_1.auth, userController_1.uploadImage);
//push notification
router.post("/users/:id/send-notification", authMiddleware_1.auth, userController_1.sendNotification);
exports.default = router;
