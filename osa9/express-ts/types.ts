import { Request } from "express";

// eslint-disable-next-line @typescript-eslint/ban-types
export type RequestBody<T> = Request<{}, {}, T>;

export interface ExerciseInfo {
	daily_exercises: Array<number>,
	target: number
}
