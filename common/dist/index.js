"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInputs = exports.userSignin = exports.userSignup = void 0;
const zod_1 = require("zod");
exports.userSignup = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional(),
});
exports.userSignin = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.blogInputs = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
