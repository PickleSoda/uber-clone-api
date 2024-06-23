// src/features/trip/application/use-cases/updateTripStatus.usecase.ts
import { type TripRepository } from '../repositories/trip.repository';
import { type TripEntity } from '../entities/trip.entity';

export interface UpdateTripStatusUseCase {
	execute: (id: string, status: string) => Promise<TripEntity>;
}

export class UpdateTripStatus implements UpdateTripStatusUseCase {
	constructor(private readonly repository: TripRepository) {}

	async execute(id: string, status: string): Promise<TripEntity> {
		return await this.repository.updateStatus(id, status);
	}
}
