// src/features/trip/presentation/controller.ts

import type { Request, Response, NextFunction } from 'express';
import { HttpCode } from '../../../core';
import { CreateTrip, GetTripById, CreateTripDto, GetTripByIdDto, type TripRepository } from '../domain';

interface Params {
	id: string;
}

interface RequestBody {
	currentLatitude: number;
	currentLongitude: number;
	destinationLatitude: number;
	destinationLongitude: number;
	passengerName: string;
	passengerPhone: string;
	currentPlaceName: string;
	destinationPlaceName: string;
	vehicleType: string;
	vehicleLicensePlate: string;
	driverName: string;
}

// interface RequestQuery {
// 	page: string;
// 	limit: string;
// }

export class TripController {
	constructor(private readonly repository: TripRepository) {}

	public getById = (req: Request<Params>, res: Response, next: NextFunction): void => {
		const { id } = req.params;
		if (!id) {
			throw new Error('Id is required');
		}
		const getTripByIdDto = GetTripByIdDto.create({ id });
		new GetTripById(this.repository)
			.execute(getTripByIdDto)
			.then((result) => res.json({ data: result }))
			.catch(next);
	};

	public create = (req: Request<unknown, unknown, RequestBody>, res: Response, next: NextFunction): void => {
		const data = req.body;
		const createDto = CreateTripDto.create({ data });
		new CreateTrip(this.repository)
			.execute(createDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	// public update = async (
	// 	req: Request<Params, unknown, RequestBody>,
	// 	res: Response,
	// 	next: NextFunction
	// ): Promise<void> => {
	// 	try {
	// 		const { id } = req.params;
	// 		const updateDto = UpdateTripDto.create({ ...req.body, id });
	// 		const result = await new UpdateTrip(this.repository).execute(updateDto);
	// 		res.json({ data: result });
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// };

	// public delete = async (req: Request<Params>, res: Response, next: NextFunction): Promise<void> => {
	// 	try {
	// 		const { id } = req.params;
	// 		if (!id) throw new Error('Id is required');
	// 		const getTripByIdDto = GetTripByIdDto.create(id);
	// 		const result = await new DeleteTrip(this.repository).execute(getTripByIdDto);
	// 		res.json({ data: result });
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// };
}
