"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/userController");
const router = (0, express_1.Router)();
router.get("/users", userController_1.getUsers);
router.get("/users/:id", userController_1.getUser);
router.post("/users", userController_1.createUser);
router.patch("/users/:id", userController_1.updateUser);
router.delete("/users/:id", userController_1.deleteUser);
router.post("/users/:id/image-upload", userController_1.uploadImage);
exports.default = router;
