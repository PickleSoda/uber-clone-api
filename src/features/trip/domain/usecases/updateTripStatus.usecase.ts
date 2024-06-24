// src/features/trip/application/use-cases/updateTripStatus.usecase.ts
import { type TripRepository } from '../repositories/trip.repository';
import { type TripEntity } from '../entities/trip.entity';
import { type GetTripByIdDto } from '../dtos';
export interface UpdateTripStatusUseCase {
	execute: (id: GetTripByIdDto, status: string) => Promise<TripEntity>;
}

export class UpdateTripStatus implements UpdateTripStatusUseCase {
	constructor(private readonly repository: TripRepository) {}

	async execute(id: GetTripByIdDto, status: string): Promise<TripEntity> {
		return await this.repository.updateStatus(id, status);
	}
}
