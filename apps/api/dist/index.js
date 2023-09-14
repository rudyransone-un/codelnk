"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const PORT = 3000;
const app = (0, express_1.default)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/test", (_, res) => {
    res.status(200).json({ ping: "pong" });
});
app.post("/upload", upload.single("file"), (req, res) => {
    console.log('#INFO', req.file);
    res.status(200).json({ message: "file uploaded" });
});
app.listen(PORT, () => console.log(`Started on http://localhost:${PORT}`));
