// src\routes.ts

import { Router } from 'express';

import { TodoRoutes } from './features/todos';
import { AuthRoutes } from './features/auth';
import { TripRoutes } from './features/trip';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/auth', AuthRoutes.routes);
		router.use('/todos', TodoRoutes.routes);
		router.use('/trips', TripRoutes.routes);

		// rest of routes
		// ...

		return router;
	}
}
