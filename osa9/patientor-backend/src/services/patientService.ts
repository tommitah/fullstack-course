import patientsData from "../../data/patients.json";
import { SecurePatientData } from "../types";

const getPatients = (): SecurePatientData[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

export default {
	getPatients,
};
