// src/features/trip/presentation/routes.test.ts

import request from 'supertest';
import { testServer } from '../../../testServer'; // Ensure this is configured correctly for your project
import { ErrorResponse, HttpCode, SuccessResponse, envs } from '../../../core';

import { type TripEntity } from '../domain';

describe('TripRoutes Tests', () => {
	const url = `${envs.API_PREFIX}/trips`;

	beforeAll(async () => {
		await testServer.start(); // Make sure your server is set to be started in a test mode
	});

	afterAll(() => {
		testServer.close();
	});

	test('should create a trip', async () => {
		const tripData = {
			currentLatitude: 12.34,
			currentLongitude: 56.78,
			destinationLatitude: 23.45,
			destinationLongitude: 67.89,
			passengerName: 'John Doe',
			passengerPhone: '1234567890',
			currentPlaceName: 'Start Place',
			destinationPlaceName: 'End Place',
			vehicleType: 'Car',
			vehicleLicensePlate: 'XYZ-1234',
			driverName: 'Driver A'
		};

		await request(testServer.app)
			.post(url)
			.send(tripData)
			.expect(HttpCode.CREATED)
			.expect('Content-Type', /json/)
			.then(({ body }) => {
				expect(body.data).toHaveProperty('id');
				expect(body.data.driverName).toEqual('Driver A');
			});
	});

	test('should get a trip by id', async () => {
		await request(testServer.app)
			.get(`${url}/1`) // Assuming '1' is a valid trip ID
			.expect(HttpCode.OK)
			.expect('Content-Type', /json/)
			.then(({ body }) => {
				expect(body.data).toHaveProperty('id', '1');
			});
	});

	test('should handle not found trip', async () => {
		await request(testServer.app)
			.get(`${url}/999`) // Assuming '999' is not a valid trip ID
			.expect(HttpCode.NOT_FOUND)
			.then(({ body }) => {
				expect(body).toHaveProperty('message');
			});
	});

	test('should listen to trip creation events', (done) => {
		const req = request(testServer.app)
			.get(`${url}/events`)
			.expect(HttpCode.OK)
			.expect('Content-Type', /text\/event-stream/);

		req.on('data', function (data) {
			expect(data).toContain('data:');
			req.abort(); // Terminate the connection after receiving data
			done();
		});
	});

	// Additional tests for update and delete operations can be added here
});
