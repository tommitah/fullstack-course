"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientService_1 = __importDefault(require("../services/patientService"));
const patientsRouter = (0, express_1.Router)();
patientsRouter.get('/', (_req, res) => {
    const patients = patientService_1.default.getPatients();
    res.send(patients);
});
exports.default = patientsRouter;
