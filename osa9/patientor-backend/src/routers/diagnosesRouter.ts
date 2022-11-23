import { Router } from "express";
import diagnoseService from "../services/diagnoseService";

const diagnosesRouter = Router();

diagnosesRouter.get('/', (_req, res) => {
	const diagnoses = diagnoseService.getDiagnoses();
	res.send(diagnoses);
});

export default diagnosesRouter;
