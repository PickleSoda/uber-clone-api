// src/features/trip/domain/dtos/create.dto.test.ts
import { CreateTripDto } from './create.dto';
import { AppError } from '../../../../core';

describe('CreateTripDto tests', () => {
    test('should create a valid CreateTripDto', () => {
        const tripData = CreateTripDto.create({
            currentLatitude: 12.34, currentLongitude: 56.78,
            destinationLatitude: 12.34, destinationLongitude: 56.78,
            passengerName: 'John Doe', passengerPhone: '1234567890',
            currentPlaceName: 'Origin', destinationPlaceName: 'Destination',
            vehicleType: 'Car', vehicleLicensePlate: 'XYZ-1234', driverName: 'Jane Doe'
        });
        expect(tripData).toBeInstanceOf(CreateTripDto);
        expect(tripData.passengerName).toBe('John Doe');
    });

    test('should throw a validation error if passenger name is empty', () => {
        expect(() => CreateTripDto.create({
            currentLatitude: 12.34, currentLongitude: 56.78,
            destinationLatitude: 12.34, destinationLongitude: 56.78,
            passengerName: '', passengerPhone: '1234567890',
            currentPlaceName: 'Origin', destinationPlaceName: 'Destination',
            vehicleType: 'Car', vehicleLicensePlate: 'XYZ-1234', driverName: 'Jane Doe'
        })).toThrow(AppError);
    });
});