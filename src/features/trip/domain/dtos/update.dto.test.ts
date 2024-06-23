// src/features/trip/domain/dtos/updateTrip.dto.test.ts
import { UpdateTripDto } from './update.dto';
import { AppError } from '../../../../core';
import { TripStatus } from '../constants';

describe('UpdateTripDto tests', () => {
    test('should create a valid UpdateTripDto', () => {
        const updateData = UpdateTripDto.create({
            id: '1',
            status: TripStatus.STARTED,
            driverName: 'Jane Doe',
            vehicleLicensePlate: 'XYZ-1234'
        });
        expect(updateData).toBeInstanceOf(UpdateTripDto);
        expect(updateData.id).toBe('1');
        expect(updateData.status).toBe(TripStatus.STARTED);
        expect(updateData.driverName).toBe('Jane Doe');
        expect(updateData.vehicleLicensePlate).toBe('XYZ-1234');
    });

    test('should throw a validation error if id is empty', () => {
        expect(() => UpdateTripDto.create({
            id: '',
            status: TripStatus.STARTED
        })).toThrow(AppError);
    });

    test('should include the correct validation error message if id is empty', () => {
        try {
            UpdateTripDto.create({ id: '' });
        } catch (error) {
            expect(error).toBeInstanceOf(AppError);
            if (error instanceof AppError) {
                expect(error.validationErrors).toEqual([{ fields: ['id'], constraint: 'ID is required' }]);
            }
        }
    });

    // Additional tests can be added here for further validation rules
});
