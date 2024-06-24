import { type GetTripByIdDto } from '../dtos';
import { type TripEntity } from '../entities';
import { type TripRepository } from '../repositories';

export interface GetTripByIdUseCase {
	execute: (getByIdDto: GetTripByIdDto) => Promise<TripEntity>;
}

export class GetTripById implements GetTripByIdUseCase {
	constructor(private readonly repository: TripRepository) {}

	async execute(getByIdDto: GetTripByIdDto): Promise<TripEntity> {
		return await this.repository.getById(getByIdDto);
	}
}
