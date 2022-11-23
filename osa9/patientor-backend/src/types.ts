// These might change
export interface Diagnose {
	code: string,
	name: string,
	latin?: string
}

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
