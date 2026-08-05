import { mockLookService } from './mockLookService';
import type { LookService } from './types';

/** Ponto único de troca entre mock e backend. */
export const lookService: LookService = mockLookService;

export type { LookService } from './types';
