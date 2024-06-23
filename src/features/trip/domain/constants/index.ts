// src/features/trip/domain/constants/tripStatus.ts
export const TripStatus = {
	PENDING: 'PENDING',
	ACCEPTED_BY_DRIVER: 'ACCEPTED_BY_DRIVER',
	WAITING_FOR_CUSTOMER: 'WAITING_FOR_CUSTOMER',
	STARTED: 'STARTED',
	COMPLETED: 'COMPLETED',
	CANCELLED_BY_DRIVER: 'CANCELLED_BY_DRIVER',
	CANCELLED_BY_CUSTOMER: 'CANCELLED_BY_CUSTOMER'
} as const;

export type TripStatusType = (typeof TripStatus)[keyof typeof TripStatus];
