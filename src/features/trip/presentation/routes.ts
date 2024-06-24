// src/features/trip/presentation/routes.ts
import { Router } from 'express';
import { TripController } from './controller';
import { TripRepositoryImpl, TripDatasourceImpl } from '../infrastructure';
import { type TripEntity } from '../domain';

export class TripRoutes {
	static get routes(): Router {
		const router = Router();
		const datasource = new TripDatasourceImpl();
		const repository = new TripRepositoryImpl(datasource);
		const controller = new TripController(repository);

		router.post('/', controller.create);

		router.get('/:id', controller.getById);

		router.get('/events', (req, res) => {
			res.setHeader('Content-Type', 'text/event-stream');
			res.setHeader('Cache-Control', 'no-cache');
			res.setHeader('Connection', 'keep-alive');

			const eventEmitter = req.app.get('eventEmitter');
			const onTripCreated = (trip: TripEntity): void => {
				res.write(`data: ${JSON.stringify(trip)}\n\n`);
			};

			eventEmitter.on('tripCreated', onTripCreated);

			req.on('close', () => {
				eventEmitter.removeListener('tripCreated', onTripCreated);
				res.end();
			});
		});

		return router;
	}
}
