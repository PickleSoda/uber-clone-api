// src/features/trip/domain/repositories/tripRepository.ts
import type { TripEntity } from '../entities/trip.entity';
import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type GetTripByIdDto, type CreateTripDto } from '../dtos';
export abstract class TripRepository {
	abstract create(trip: CreateTripDto): Promise<TripEntity>;
	abstract getById(getByIdDto: GetTripByIdDto): Promise<TripEntity>;
	abstract updateStatus(id: GetTripByIdDto, status: string): Promise<TripEntity>;
	abstract getAllPending(pagination: PaginationDto): Promise<PaginationResponseEntity<TripEntity[]>>;
}
