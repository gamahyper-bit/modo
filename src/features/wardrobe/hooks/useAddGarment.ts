import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import { wardrobeService } from '@/services/wardrobe';
import type { GarmentDraft } from '@/types/wardrobe';

import { wardrobeKeys } from './useWardrobe';

export type AddStep = 'capturar' | 'analisando' | 'confirmar';

const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  quality: 0.8,
  allowsEditing: false,
};

/**
 * O fluxo de adicionar peça.
 *
 * Três passos, e o do meio é da IA: o usuário fotografa, a IA lê, o usuário
 * confirma. Nenhum campo em branco chega para ele preencher — é a diferença
 * entre cadastrar roupa e ter alguém cadastrando por você.
 */
export function useAddGarment() {
  const queryClient = useQueryClient();
  const [step, setStep] = useState<AddStep>('capturar');
  const [draft, setDraft] = useState<GarmentDraft>();
  const [error, setError] = useState<string>();

  const analyze = async (imageUri: string) => {
    setStep('analisando');
    setError(undefined);

    try {
      const analysis = await wardrobeService.analyze(imageUri);
      setDraft(analysis.suggestion);
      setStep('confirmar');
    } catch {
      setError('Não consegui ler esta peça. Tente outra foto.');
      setStep('capturar');
    }
  };

  const capture = async (source: 'camera' | 'galeria') => {
    const permission =
      source === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setError(
        source === 'camera'
          ? 'Preciso da câmera para fotografar a peça.'
          : 'Preciso acessar suas fotos para adicionar a peça.'
      );
      return;
    }

    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync(PICKER_OPTIONS)
        : await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);

    const asset = result.canceled ? undefined : result.assets[0];
    if (!asset) return;

    await analyze(asset.uri);
  };

  const save = useMutation({
    mutationFn: (garment: GarmentDraft) => wardrobeService.add(garment),
    onSuccess: () => {
      // O armário muda e a recomendação nasce dele: as duas precisam esquecer
      // o que sabiam. É isto que faz a Home refletir a peça nova.
      queryClient.invalidateQueries({ queryKey: wardrobeKeys.all });
      queryClient.invalidateQueries({ queryKey: ['recommendation'] });
    },
  });

  return {
    step,
    draft,
    error,
    isSaving: save.isPending,
    capture,
    updateDraft: (patch: Partial<GarmentDraft>) =>
      setDraft((current) => (current ? { ...current, ...patch } : current)),
    save: (onDone: () => void) => {
      if (draft) save.mutate(draft, { onSuccess: onDone });
    },
  };
}
