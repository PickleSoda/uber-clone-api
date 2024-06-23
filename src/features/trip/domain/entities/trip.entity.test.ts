// src/features/trip/domain/entities/trip.entity.test.ts
import { TripEntity } from './trip.entity';
import { AppError } from '../../../../core';
import { TripStatus } from '../constants';

describe('TripEntity tests', () => {
    test('should create trip entity instance', () => {
        const trip = new TripEntity('1', 12.3456, -34.5678, 23.4567, -45.6789, new Date(), 'John Doe', '1234567890', 'Origin Place', 'Destination Place', 'Car', 'ABC-1234', 'Jane Doe', TripStatus.PENDING);
        expect(trip).toBeInstanceOf(TripEntity);
        expect(trip.id).toBe('1');
        expect(trip.passengerName).toBe('John Doe');
        expect(trip.vehicleLicensePlate).toBe('ABC-1234');
        expect(trip.driverName).toBe('Jane Doe');
    });

    test('should create a Trip entity instance from JSON', () => {
        const trip = TripEntity.fromJson({
            id: '1',
            currentLatitude: 12.3456,
            currentLongitude: -34.5678,
            destinationLatitude: 23.4567,
            destinationLongitude: -45.6789,
            createdAt: '2021-01-01T12:00:00Z',
            passengerName: 'John Doe',
            passengerPhone: '1234567890',
            currentPlaceName: 'Origin Place',
            destinationPlaceName: 'Destination Place',
            vehicleType: 'Car',
            vehicleLicensePlate: 'ABC-1234',
            driverName: 'Jane Doe',
            status: TripStatus.PENDING
        });
        expect(trip).toBeInstanceOf(TripEntity);
        expect(trip.id).toBe('1');
        expect(trip.passengerName).toBe('John Doe');
        expect(trip.vehicleLicensePlate).toBe('ABC-1234');
        expect(trip.driverName).toBe('Jane Doe');
    });

    test('should throw validation error if required properties are missing', () => {
        expect(() => TripEntity.fromJson({})).toThrow(
            AppError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }])
        );
    });
});
