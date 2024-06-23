// src/features/trip/application/use-cases/createTrip.usecase.ts
import { type TripRepository } from '../repositories/trip.repository';
import { type TripEntity } from '../entities/trip.entity';

export interface CreateTripUseCase {
	execute: (tripData: TripEntity) => Promise<TripEntity>;
}

export class CreateTrip implements CreateTripUseCase {
	constructor(private readonly repository: TripRepository) {}

	async execute(tripData: TripEntity): Promise<TripEntity> {
		return await this.repository.create(tripData);
	}
}
