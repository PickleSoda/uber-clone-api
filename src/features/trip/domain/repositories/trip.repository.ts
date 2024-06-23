// src/features/trip/domain/repositories/tripRepository.ts
import type { TripEntity } from '../entities/trip.entity';

export abstract class TripRepository {
	abstract create(trip: TripEntity): Promise<TripEntity>;
	abstract getById(id: string): Promise<TripEntity | null>;
	abstract updateStatus(id: string, status: string): Promise<TripEntity>;
	abstract getAllPending(): Promise<TripEntity[]>;
}
