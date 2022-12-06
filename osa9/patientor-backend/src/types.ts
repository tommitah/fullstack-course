import { Request } from "express";
import { ValidationError } from "express-validator";


// These might change
export interface Diagnose {
	code: string,
	name: string,
	latin?: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type RequestBody<T> = Request<{}, {}, T>;

export enum GenderEnum {
	MALE = 'male',
	FEMALE = 'female',
	OTHER = 'other'
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

export class RouteError {
	msg!: string;
	record!: Record<string, ValidationError>;
	statusCode!: number;

	constructor(msg: string, record: Record<string, ValidationError> = {}, statusCode = 500) {
		this.msg = msg;
		this.record = record;
		this.statusCode = statusCode;
	}
}
