"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const getUsers = (req, res, next) => {
    const users = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
        { id: 3, name: "John Smith" },
    ];
    res.status(200).json({
        message: "Users retrieved successfully",
        data: users,
    });
};
exports.getUsers = getUsers;
