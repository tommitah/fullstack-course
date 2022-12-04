import patientsData from "../../data/patients.json";
import { Patient, SecurePatientData } from "../types";

const getPatients = (): SecurePatientData[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patient: Patient) => {
	console.log('old data: ', patientsData);
	console.log('new data: ', patient);
	patientsData.push(patient);
};

export default {
	getPatients,
	addPatient
};
