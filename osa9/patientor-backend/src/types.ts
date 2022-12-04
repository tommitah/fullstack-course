import { Request } from "express";


// These might change
export interface Diagnose {
	code: string,
	name: string,
	latin?: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type RequestBody<T> = Request<{}, {}, T>;

export enum GenderEnum {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export interface Patient {
	id: string,
	name: string,
	dateOfBirth: string,
	ssn: string,
	gender: GenderEnum,
	occupation: string,
}

export type SecurePatientData = Omit<Patient, 'ssn'>;
