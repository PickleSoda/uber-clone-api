import { TripEntity } from '../entities/trip.entity';
import { TripDatasource } from './datasource';
import { CreateTripDto, UpdateTripDto, GetTripByIdDto } from '../dtos';
import { PaginationDto, PaginationResponseEntity } from '../../../shared';
import { TripStatus } from '../constants';

class MockTripDatasource implements TripDatasource {
	async create(createDto: CreateTripDto): Promise<TripEntity> {
		return new TripEntity(
			'1',
			12.3456,
			-34.5678,
			23.4567,
			-45.6789,
			new Date(),
			'John Doe',
			'1234567890',
			'Origin Place',
			'Destination Place',
			'Car',
			'ABC-1234',
			'Jane Doe',
			TripStatus.PENDING
		);
	}

	async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TripEntity[]>> {
		const trip = new TripEntity(
			'1',
			12.3456,
			-34.5678,
			23.4567,
			-45.6789,
			new Date(),
			'John Doe',
			'1234567890',
			'Origin Place',
			'Destination Place',
			'Car',
			'ABC-1234',
			'Jane Doe',
			TripStatus.PENDING
		);
		return {
			results: [trip],
			currentPage: 1,
			nextPage: null,
			prevPage: null,
			total: 1,
			totalPages: 1
		};
	}

	async getById(id: GetTripByIdDto): Promise<TripEntity> {
		return new TripEntity(
			'1',
			12.3456,
			-34.5678,
			23.4567,
			-45.6789,
			new Date(),
			'John Doe',
			'1234567890',
			'Origin Place',
			'Destination Place',
			'Car',
			'ABC-1234',
			'Jane Doe',
			TripStatus.PENDING
		);
	}

	async update(id: string, updateDto: UpdateTripDto): Promise<TripEntity> {
		const trip = new TripEntity(
			'1',
			12.3456,
			-34.5678,
			23.4567,
			-45.6789,
			new Date(),
			'John Doe',
			'1234567890',
			'Origin Place',
			'Destination Place',
			'Car',
			'ABC-1234',
			'Jane Doe',
			TripStatus.PENDING
		);
		trip.status = updateDto.status || TripStatus.PENDING; // Simplified for example purposes
		return trip;
	}

	async delete(id: string): Promise<TripEntity> {
		return new TripEntity(
			'1',
			12.3456,
			-34.5678,
			23.4567,
			-45.6789,
			new Date(),
			'John Doe',
			'1234567890',
			'Origin Place',
			'Destination Place',
			'Car',
			'ABC-1234',
			'Jane Doe',
			TripStatus.PENDING
		);
	}
	async getAllPending(pagination: PaginationDto): Promise<PaginationResponseEntity<TripEntity[]>> {
		const trip = new TripEntity(
			'1',
			12.3456,
			-34.5678,
			23.4567,
			-45.6789,
			new Date(),
			'John Doe',
			'1234567890',
			'Origin Place',
			'Destination Place',
			'Car',
			'ABC-1234',
			'Jane Doe',
			TripStatus.PENDING
		);
		return {
			results: [trip],
			currentPage: 1,
			nextPage: null,
			prevPage: null,
			total: 1,
			totalPages: 1
		};
	}
}

describe('MockTripDatasource tests', () => {
    let mockDatasource: MockTripDatasource;

    beforeEach(() => {
        mockDatasource = new MockTripDatasource();
    });

    test('should create a trip successfully', async () => {
        const createDto = CreateTripDto.create({
            currentLatitude: 12.3456, 
            currentLongitude: 34.5678,
            destinationLatitude: 23.4567,
            destinationLongitude: 45.6789,
            passengerName: 'John Doe',
            passengerPhone: '1234567890',
            currentPlaceName: 'Place A',
            destinationPlaceName: 'Place B',
            vehicleType: 'SUV',
            vehicleLicensePlate: 'XYZ-1234',
            driverName: 'Jane Doe'
        });
        const trip = await mockDatasource.create(createDto);
        expect(trip).toBeInstanceOf(TripEntity);
        expect(trip.id).toBe('1');
    });

    test('should return a list of trips', async () => {
        const pagination = PaginationDto.create({ page: 1, limit: 10 });
        const paginatedTrips = await mockDatasource.getAll(pagination);
        expect(paginatedTrips.results).toHaveLength(1);
        expect(paginatedTrips.results[0]).toBeInstanceOf(TripEntity);
        expect(paginatedTrips.currentPage).toBe(1);
    });

    // test('should fetch a trip by ID', async () => {
    //     const trip = await mockDatasource.getById('1');
    //     expect(trip).toBeInstanceOf(TripEntity);
    //     expect(trip.id).toBe('1');
    // });

    test('should update a trip successfully', async () => {
        const updateDto = UpdateTripDto.create({
            id: '1', 
            status: TripStatus.STARTED
        });
        const updatedTrip = await mockDatasource.update('1', updateDto);
        expect(updatedTrip.status).toBe(TripStatus.STARTED);
    });

    test('should delete a trip successfully', async () => {
        const deletedTrip = await mockDatasource.delete('1');
        expect(deletedTrip).toBeInstanceOf(TripEntity);
    });
});
