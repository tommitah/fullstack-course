import { Request } from "express";


// These might change
export interface Diagnose {
	code: string,
	name: string,
	latin?: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type RequestBody<T> = Request<{}, {}, T>;

// These might change
export interface Patient {
	id: string,
	name: string,
	dateOfBirth: string,
	ssn: string,
	gender: string,
	occupation: string,
}

export type SecurePatientData = Omit<Patient, 'ssn'>;
// type Gender = 'Male' | 'Female' | 'Other';
