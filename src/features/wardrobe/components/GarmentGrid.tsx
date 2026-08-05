import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { ClothingCard } from '@/components';
import { pieceEnter, pieceExit, pieceLayout } from '@/components/motion';
import { spacing } from '@/theme';
import type { Garment } from '@/types/wardrobe';

type GarmentGridProps = {
  garments: Garment[];
  loading?: boolean;
  onSelect?: (garment: Garment) => void;
};

/**
 * A grade do armário — **duas colunas**, não três.
 *
 * Três colunas é vocabulário de marketplace: a peça vira miniatura e a tela
 * vira estoque. Com duas, cada peça tem tamanho de retrato, a legenda cabe sem
 * truncar e o conjunto lê como coleção organizada. O armário do Modo é uma
 * curadoria, não um catálogo.
 */
export function GarmentGrid({
  garments,
  loading = false,
  onSelect,
}: GarmentGridProps) {
  if (loading) {
    return (
      <View style={styles.grid}>
        {[0, 1, 2, 3].map((index) => (
          <View key={index} style={styles.cell}>
            <ClothingCard loading showCaption />
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.grid}>
      {garments.map((garment, index) => (
        // Chave é a peça: ao trocar de filtro, o que permanece desliza em vez
        // de piscar.
        <Animated.View
          key={garment.id}
          style={styles.cell}
          layout={pieceLayout}
          entering={pieceEnter(Math.min(index, 5))}
          exiting={pieceExit}
        >
          <ClothingCard
            name={garment.name}
            imageUri={garment.imageUri}
            placeholderIcon={garment.category}
            showCaption
            onPress={onSelect ? () => onSelect(garment) : undefined}
          />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // `space-between` em vez de `gap` horizontal: com largura percentual, somar
    // gap estoura a linha e joga a segunda coluna para baixo.
    justifyContent: 'space-between',
    rowGap: spacing.xl,
  },
  cell: {
    width: '48%',
  },
});
