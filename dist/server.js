"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const mongoURL = 'mongodb+srv://madiyarabik111:h0sh1rama!@cluster0.edsmm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose_1.default
    .connect(mongoURL)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.post('/auth/login', (req, res) => { });
app.listen(4400, (err) => {
    if (err)
        return console.error(err);
    console.log('Server is listening on port 4400');
});
