"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const { PORT, ENV_NAME } = process.env;
const app = (0, express_1.default)();
const port = PORT || 3000;
app.use(express_1.default.json());
//Test call
app.get('/test', (req, res) => {
    res.status(200).send(`Test api is working fine on port:${port}`);
});
//Initializing
app.listen(port, () => {
    console.log(`server is listening on ${port} : ${ENV_NAME}`);
});
