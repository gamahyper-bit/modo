import {
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
} from '@expo-google-fonts/instrument-serif';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';

/**
 * Carrega apenas os pesos que a escala tipográfica usa. Cada peso extra é peso
 * no bundle e uma tentação de sair da escala.
 */
export function useAppFonts() {
  const [loaded, error] = useFonts({
    InstrumentSerif_400Regular,
    InstrumentSerif_400Regular_Italic,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  return { fontsReady: loaded || error !== null, fontError: error };
}
