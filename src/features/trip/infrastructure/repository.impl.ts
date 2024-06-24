// src/features/trip/infrastructure/trip.repository.impl.ts

import { type PaginationDto, type PaginationResponseEntity } from '../../shared';
import type { TripStatusType } from '../domain/constants';
import {
	type TripEntity,
	type TripDatasource,
	type UpdateTripDto,
	type CreateTripDto,
	type TripRepository,
	type GetTripByIdDto
} from '../domain';

export class TripRepositoryImpl implements TripRepository {
	constructor(private readonly datasource: TripDatasource) {}

	async create(createDto: CreateTripDto): Promise<TripEntity> {
		return await this.datasource.create(createDto);
	}

	async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TripEntity[]>> {
		return await this.datasource.getAll(pagination);
	}

	async getById(id: GetTripByIdDto): Promise<TripEntity> {
		return await this.datasource.getById(id);
	}

	async update(updateDto: UpdateTripDto): Promise<TripEntity> {
		return await this.datasource.update(updateDto.id, updateDto);
	}

	async delete(id: string): Promise<TripEntity> {
		return await this.datasource.delete(id);
	}

	async updateStatus(id: GetTripByIdDto, status: TripStatusType): Promise<TripEntity> {
		const trip = await this.getById(id);
		if (!trip) throw new Error('Trip not found');
		trip.status = status;
		return await this.datasource.update(id.id, trip);
	}

	async getAllPending(pagination: PaginationDto): Promise<PaginationResponseEntity<TripEntity[]>> {
		return await this.datasource.getAllPending(pagination);
	}
}
