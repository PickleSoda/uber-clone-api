import { type ValidationType, ZERO, AppError } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class GetTripByIdDto implements CoreDto<GetTripByIdDto> {
	private constructor(public readonly id: string) {
		this.validate(this);
	}

	public validate(dto: GetTripByIdDto): void {
		const errors: ValidationType[] = [];

		const { id } = dto;

		if (!id || typeof id !== 'string') {
			errors.push({ fields: ['id'], constraint: 'Id is not a valid string' });
		}

		if (errors.length > ZERO) throw AppError.badRequest('Error validating get Trip by id', errors);
	}

	/**
	 * This method creates a new instance of the DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of the DTO
	 */
	public static create(object: Record<string, unknown>): GetTripByIdDto {
		const { id } = object;
		return new GetTripByIdDto(id as string);
	}
}
