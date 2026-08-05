import type { Weather } from '@/types/look';

export interface WeatherService {
  current(): Promise<Weather>;
}

/**
 * Clima do dia.
 *
 * Mock estável de propósito: a mesma resposta durante toda a sessão, para que o
 * look reconstruído no detalhe seja idêntico ao da Home. Quando `expo-location`
 * e uma fonte real entrarem, só esta implementação muda.
 */
const mockWeatherService: WeatherService = {
  async current(): Promise<Weather> {
    return { temperature: 18, condition: 'nublado' };
  },
};

/** Ponto único de troca entre mock e backend. */
export const weatherService: WeatherService = mockWeatherService;
