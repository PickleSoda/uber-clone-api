// src/features/trip/domain/dtos/create.dto.ts
import { AppError, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class CreateTripDto implements CoreDto<CreateTripDto> {
	private constructor(
		public readonly currentLatitude: number,
		public readonly currentLongitude: number,
		public readonly destinationLatitude: number,
		public readonly destinationLongitude: number,
		public readonly passengerName: string,
		public readonly passengerPhone: string,
		public readonly currentPlaceName: string,
		public readonly destinationPlaceName: string,
		public readonly vehicleType: string,
		public readonly vehicleLicensePlate: string,
		public readonly driverName: string
	) {
		this.validate(this);
	}

	public validate(dto: CreateTripDto): void {
		const errors: ValidationType[] = [];

		if (!dto.passengerName || dto.passengerName.length === ZERO) {
			errors.push({ fields: ['passengerName'], constraint: 'Passenger name is required' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating create trip', errors);
	}

	public static create(object: Record<string, unknown>): CreateTripDto {
		const {
			currentLatitude,
			currentLongitude,
			destinationLatitude,
			destinationLongitude,
			passengerName,
			passengerPhone,
			currentPlaceName,
			destinationPlaceName,
			vehicleType,
			vehicleLicensePlate,
			driverName
		} = object;
		return new CreateTripDto(
			currentLatitude as number,
			currentLongitude as number,
			destinationLatitude as number,
			destinationLongitude as number,
			passengerName as string,
			passengerPhone as string,
			currentPlaceName as string,
			destinationPlaceName as string,
			vehicleType as string,
			vehicleLicensePlate as string,
			driverName as string
		);
	}
}
