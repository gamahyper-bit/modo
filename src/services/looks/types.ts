import type { Look } from '@/types/look';

/**
 * A porta dos looks.
 *
 * Separada da recomendação de propósito: recomendar é produzir uma escolha,
 * recuperar e guardar é persistência. No backend elas terão donos diferentes —
 * a recomendação virá do motor mais a Edge Function, e estes aqui do Postgres.
 */
export interface LookService {
  getById(lookId: string): Promise<Look>;
  /** A coleção salva, do mais recente para o mais antigo. */
  listSaved(): Promise<Look[]>;
  save(lookId: string): Promise<void>;
  remove(lookId: string): Promise<void>;
  isSaved(lookId: string): Promise<boolean>;
}
