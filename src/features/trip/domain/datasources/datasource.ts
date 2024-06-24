// src/features/trip/domain/datasources/tripDatasource.ts
import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type CreateTripDto, type UpdateTripDto, type GetTripByIdDto } from '../dtos';
import { type TripEntity } from '../entities';

export abstract class TripDatasource {
	abstract create(createDto: CreateTripDto): Promise<TripEntity>;
	abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TripEntity[]>>;
	abstract getById(id: GetTripByIdDto): Promise<TripEntity>;
	abstract update(id: string, updateDto: UpdateTripDto): Promise<TripEntity>;
	abstract delete(id: string): Promise<TripEntity>;
	abstract getAllPending(pagination: PaginationDto): Promise<PaginationResponseEntity<TripEntity[]>>;
}
