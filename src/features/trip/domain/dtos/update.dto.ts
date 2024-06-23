// src/features/trip/domain/dtos/update.dto.ts
import { AppError, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';
import { type TripStatusType } from '../constants';

export class UpdateTripDto implements CoreDto<UpdateTripDto> {
	private constructor(
		public readonly id: string,
		public readonly status?: TripStatusType,
		public readonly driverName?: string,
		public readonly vehicleLicensePlate?: string
	) {
		this.validate(this);
	}

	public validate(dto: UpdateTripDto): void {
		const errors: ValidationType[] = [];

		// Check if the ID is valid
		if (!dto.id || dto.id.length === ZERO) {
			errors.push({ fields: ['id'], constraint: 'ID is required' });
		}

		// Additional validations can be added here if needed
		if (errors.length > ZERO) throw AppError.badRequest('Error validating update trip', errors);
	}

	/**
	 * This method creates a new instance of this DTO class with the given
	 * properties from body or query parameters.
	 * @param object - The object with properties to create a new DTO instance.
	 * @returns A new instance of UpdateTripDto
	 */
	public static create(object: Record<string, unknown>): UpdateTripDto {
		const { id, status, driverName, vehicleLicensePlate } = object;
		return new UpdateTripDto(
			id as string,
			status as TripStatusType,
			driverName as string,
			vehicleLicensePlate as string
		);
	}
}
