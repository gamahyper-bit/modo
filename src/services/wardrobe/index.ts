import { mockWardrobeService } from './mockWardrobeService';
import type { WardrobeService } from './types';

/** Ponto único de troca entre mock e backend. */
export const wardrobeService: WardrobeService = mockWardrobeService;

export type { GarmentAnalysis, WardrobeFilter, WardrobeService } from './types';
