// src/features/trip/domain/entities/trip.entity.ts
import { TripStatus, type TripStatusType } from '../constants';
import { AppError, ZERO } from '../../../../core';

export class TripEntity {
	constructor(
		public id: string,
		public currentLatitude: number,
		public currentLongitude: number,
		public destinationLatitude: number,
		public destinationLongitude: number,
		public createdAt: Date,
		public passengerName: string,
		public passengerPhone: string,
		public currentPlaceName: string,
		public destinationPlaceName: string,
		public vehicleType: string,
		public vehicleLicensePlate: string,
		public driverName: string,
		public status: TripStatusType = TripStatus.PENDING
	) {}

	public static fromJson(obj: Record<string, unknown>): TripEntity {
		const {
			id,
			currentLatitude,
			currentLongitude,
			destinationLatitude,
			destinationLongitude,
			createdAt,
			passengerName,
			passengerPhone,
			currentPlaceName,
			destinationPlaceName,
			vehicleType,
			vehicleLicensePlate,
			driverName,
			status = TripStatus.PENDING
		} = obj;

		if (!id) {
			throw AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}
		if (!passengerName || (passengerName as string).length === ZERO) {
			throw AppError.badRequest('This entity requires a passenger name', [
				{ constraint: 'passengerName is required', fields: ['passengerName'] }
			]);
		}
		return new TripEntity(
			id as string,
			currentLatitude as number,
			currentLongitude as number,
			destinationLatitude as number,
			destinationLongitude as number,
			new Date(createdAt as string),
			passengerName as string,
			passengerPhone as string,
			currentPlaceName as string,
			destinationPlaceName as string,
			vehicleType as string,
			vehicleLicensePlate as string,
			driverName as string,
			status as TripStatusType
		);
	}
}
