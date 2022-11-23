"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesRouter_1 = __importDefault(require("./src/routers/diagnosesRouter"));
const patientsRouter_1 = __importDefault(require("./src/routers/patientsRouter"));
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.static('build'));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.get('/api/ping', (_req, res) => {
    console.log('pinggg');
    res.send('pong');
});
app.use('/api/diagnoses', diagnosesRouter_1.default);
app.use('/api/patients', patientsRouter_1.default);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
