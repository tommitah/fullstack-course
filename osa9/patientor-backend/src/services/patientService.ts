import patientsData from "../../data/patients.json";
import { Patient, GenderEnum, SecurePatientData } from "../types";

const getPatients = (): SecurePatientData[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender: gender as GenderEnum,
		occupation,
	}));
};

const addPatient = (patient: Patient) => {
	patientsData.push(patient);
};

export default {
	getPatients,
	addPatient
};
