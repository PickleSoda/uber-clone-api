// src/features/trip/infrastructure/trip.datasource.impl.ts

import { ONE, AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../shared';
import {
	TripEntity,
	type CreateTripDto,
	type UpdateTripDto,
	type GetTripByIdDto,
	type TripDatasource
} from '../domain';

const TRIPS_MOCK = [
	{
		id: '1',
		currentLatitude: 12.34,
		currentLongitude: 56.78,
		destinationLatitude: 23.45,
		destinationLongitude: 67.89,
		createdAt: new Date(),
		passengerName: 'John Doe',
		passengerPhone: '1234567890',
		currentPlaceName: 'Start Place',
		destinationPlaceName: 'End Place',
		vehicleType: 'Car',
		vehicleLicensePlate: 'XYZ-1234',
		driverName: 'Driver A',
		status: 'PENDING'
	}
];

export class TripDatasourceImpl implements TripDatasource {
	public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TripEntity[]>> {
		const filteredTrips = TRIPS_MOCK.filter((trip) => trip.status === 'PENDING');
		const { page, limit } = pagination;

		const total = filteredTrips.length;
		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			results: filteredTrips.slice((page - ONE) * limit, page * limit).map((trip) => TripEntity.fromJson(trip)),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async getById(id: GetTripByIdDto): Promise<TripEntity> {
		const trip = TRIPS_MOCK.find((trip) => trip.id === id.id);
		if (!trip) throw AppError.notFound(`Trip with id ${id.id} not found`);
		return TripEntity.fromJson(trip);
	}

	public async create(createDto: CreateTripDto): Promise<TripEntity> {
		const newId = (TRIPS_MOCK.length + ONE).toString();
		const newTrip = { id: newId, ...createDto, createdAt: new Date(), status: 'PENDING' };
		TRIPS_MOCK.push(newTrip);
		return TripEntity.fromJson(newTrip);
	}

	public async update(id: string, updateDto: UpdateTripDto): Promise<TripEntity> {
		const index = TRIPS_MOCK.findIndex((trip) => trip.id === id);

		TRIPS_MOCK[index] = {
			...TRIPS_MOCK[index],
			...updateDto
		};

		return TripEntity.fromJson(TRIPS_MOCK[index]);
	}

	public async delete(id: string): Promise<TripEntity> {
		const index = TRIPS_MOCK.findIndex((trip) => trip.id === id);

		const [deletedTrip] = TRIPS_MOCK.splice(index, ONE);
		return TripEntity.fromJson(deletedTrip);
	}

	public async getAllPending(pagination: PaginationDto): Promise<PaginationResponseEntity<TripEntity[]>> {
		const filteredTrips = TRIPS_MOCK.filter((trip) => trip.status === 'PENDING');
		const { page, limit } = pagination;
		const total = filteredTrips.length;
		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			results: filteredTrips.slice((page - ONE) * limit, page * limit).map((trip) => TripEntity.fromJson(trip)),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}
}
