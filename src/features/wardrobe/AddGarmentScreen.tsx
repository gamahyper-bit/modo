import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AppIcon,
  Button,
  Card,
  FieldRow,
  IconButton,
  Loading,
  Reveal,
  Text,
  Toggle,
} from '@/components';
import { colors, radius, screenPadding, spacing } from '@/theme';
import {
  CATEGORY_NAMES,
  CATEGORY_ORDER,
  GARMENT_COLORS,
  OCCASION_LABELS,
  SEASON_LABELS,
  type GarmentCategory,
  type GarmentDraft,
  type Occasion,
  type Season,
} from '@/types/wardrobe';

import { OptionSheet } from './components/OptionSheet';
import { useAddGarment } from './hooks/useAddGarment';

type AddGarmentScreenProps = {
  onDone: () => void;
  onCancel: () => void;
};

type EditingField = 'categoria' | 'cor' | 'estacoes' | 'ocasioes';

/**
 * Adicionar peça.
 *
 * Um passo do usuário, um da IA, um do usuário: fotografe, deixe ler, confirme.
 * A tela de confirmação nunca mostra campo vazio — se a IA não soube, ela chuta
 * e o usuário corrige. Formulário em branco devolveria ao usuário o trabalho
 * que o produto promete tirar dele.
 */
export function AddGarmentScreen({ onDone, onCancel }: AddGarmentScreenProps) {
  const insets = useSafeAreaInsets();
  const [editing, setEditing] = useState<EditingField>();
  const { step, draft, error, isSaving, capture, updateDraft, save } =
    useAddGarment();

  return (
    <View style={[styles.root, { paddingTop: insets.top + spacing.sm }]}>
      <View style={[styles.header, styles.padded]}>
        <IconButton
          icon="fechar"
          accessibilityLabel="Cancelar"
          onPress={onCancel}
        />
        <Text variant="headline">Nova peça</Text>
        <View style={styles.headerSpacer} />
      </View>

      {step === 'capturar' ? (
        <CaptureStep error={error} onCapture={capture} />
      ) : null}

      {step === 'analisando' ? <AnalyzingStep /> : null}

      {step === 'confirmar' && draft ? (
        <ConfirmStep
          draft={draft}
          isSaving={isSaving}
          bottomInset={insets.bottom}
          onEdit={setEditing}
          onChange={updateDraft}
          onSave={() => save(onDone)}
        />
      ) : null}

      {draft ? (
        <>
          <OptionSheet
            visible={editing === 'categoria'}
            title="Categoria"
            options={CATEGORY_ORDER.map((category) => ({
              value: category,
              label: CATEGORY_NAMES[category],
            }))}
            selected={[draft.category]}
            onSelect={([category]) =>
              updateDraft({ category: category as GarmentCategory })
            }
            onClose={() => setEditing(undefined)}
          />

          <OptionSheet
            visible={editing === 'cor'}
            title="Cor"
            options={GARMENT_COLORS.map((color) => ({
              value: color.name,
              label: color.name,
            }))}
            selected={[draft.color.name]}
            onSelect={([name]) => {
              const color = GARMENT_COLORS.find((item) => item.name === name);
              if (color) updateDraft({ color });
            }}
            onClose={() => setEditing(undefined)}
          />

          <OptionSheet
            visible={editing === 'estacoes'}
            title="Estações"
            multiple
            options={(Object.keys(SEASON_LABELS) as Season[]).map((season) => ({
              value: season,
              label: SEASON_LABELS[season],
            }))}
            selected={draft.seasons}
            onSelect={(seasons) => updateDraft({ seasons })}
            onClose={() => setEditing(undefined)}
          />

          <OptionSheet
            visible={editing === 'ocasioes'}
            title="Ocasiões"
            multiple
            options={(Object.keys(OCCASION_LABELS) as Occasion[]).map(
              (occasion) => ({
                value: occasion,
                label: OCCASION_LABELS[occasion],
              })
            )}
            selected={draft.occasions}
            onSelect={(occasions) => updateDraft({ occasions })}
            onClose={() => setEditing(undefined)}
          />
        </>
      ) : null}
    </View>
  );
}

function CaptureStep({
  error,
  onCapture,
}: {
  error?: string;
  onCapture: (source: 'camera' | 'galeria') => void;
}) {
  return (
    <View style={[styles.padded, styles.capture]}>
      <Text variant="display">{'Fotografe a peça\ncomo ela é.'}</Text>
      <Text variant="body" tone="secondary" style={styles.captureHint}>
        Estenda sobre uma superfície lisa. Eu cuido do resto — recorto o fundo e
        leio os atributos.
      </Text>

      {error ? (
        <Text variant="bodySmall" tone="secondary" style={styles.error}>
          {error}
        </Text>
      ) : null}

      <View style={styles.captureActions}>
        <Button
          label="Tirar foto"
          icon="camera"
          onPress={() => onCapture('camera')}
        />
        <Button
          label="Escolher da galeria"
          icon="galeria"
          variant="secondary"
          onPress={() => onCapture('galeria')}
        />
      </View>
    </View>
  );
}

function AnalyzingStep() {
  return (
    <View style={styles.analyzing}>
      <Loading size={28} />
      <Text variant="title" style={styles.analyzingTitle}>
        Lendo a peça.
      </Text>
      <Text variant="body" tone="secondary" style={styles.analyzingHint}>
        Recortando o fundo e identificando tipo, cor e material.
      </Text>
    </View>
  );
}

function ConfirmStep({
  draft,
  isSaving,
  bottomInset,
  onEdit,
  onChange,
  onSave,
}: {
  draft: GarmentDraft;
  isSaving: boolean;
  bottomInset: number;
  onEdit: (field: EditingField) => void;
  onChange: (patch: Partial<GarmentDraft>) => void;
  onSave: () => void;
}) {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.padded,
        { paddingBottom: bottomInset + spacing['3xl'] },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Reveal>
        <View style={styles.stage}>
          {draft.imageUri ? (
            <Image
              source={{ uri: draft.imageUri }}
              style={styles.photo}
              contentFit="contain"
              transition={0}
              accessibilityIgnoresInvertColors
            />
          ) : (
            <AppIcon name={draft.category} size={64} color={colors.border} />
          )}
        </View>
      </Reveal>

      <Text variant="label" tone="secondary" style={styles.sectionLabel}>
        Confira o que eu li
      </Text>

      <Card style={styles.fields}>
        <FieldRow
          label="Categoria"
          value={CATEGORY_NAMES[draft.category]}
          onPress={() => onEdit('categoria')}
        />
        <FieldRow
          label="Cor"
          value={draft.color.name}
          onPress={() => onEdit('cor')}
          adornment={
            <View style={[styles.swatch, { backgroundColor: draft.color.hex }]} />
          }
        />
        <FieldRow
          label="Estações"
          value={draft.seasons.map((s) => SEASON_LABELS[s]).join(', ')}
          onPress={() => onEdit('estacoes')}
        />
        <FieldRow
          label="Ocasiões"
          value={draft.occasions.map((o) => OCCASION_LABELS[o]).join(', ')}
          onPress={() => onEdit('ocasioes')}
          last
        />
      </Card>

      <Card style={styles.fields}>
        <View style={styles.uniformRow}>
          <View style={styles.uniformCopy}>
            <Text variant="body">Uniforme de trabalho</Text>
            <Text variant="caption" tone="secondary" style={styles.uniformHint}>
              Peças de uniforme nunca entram em looks casuais.
            </Text>
          </View>
          <Toggle
            value={draft.isUniform}
            onChange={(isUniform) => onChange({ isUniform })}
            accessibilityLabel="Uniforme de trabalho"
          />
        </View>
      </Card>

      <View style={styles.save}>
        <Button label="Salvar peça" loading={isSaving} onPress={onSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  padded: {
    paddingHorizontal: screenPadding,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: -spacing.md,
    marginBottom: spacing.xl,
  },
  headerSpacer: {
    width: 44,
  },
  capture: {
    flex: 1,
    justifyContent: 'center',
  },
  captureHint: {
    marginTop: spacing.lg,
    maxWidth: 300,
  },
  error: {
    marginTop: spacing.lg,
  },
  captureActions: {
    marginTop: spacing['3xl'],
    gap: spacing.md,
  },
  analyzing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: screenPadding,
  },
  analyzingTitle: {
    marginTop: spacing.xl,
  },
  analyzingHint: {
    marginTop: spacing.sm,
    textAlign: 'center',
    maxWidth: 260,
  },
  stage: {
    aspectRatio: 3 / 4,
    backgroundColor: colors.garmentStage,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  sectionLabel: {
    marginTop: spacing['2xl'],
    marginBottom: spacing.md,
  },
  fields: {
    marginBottom: spacing.md,
  },
  swatch: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  uniformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  uniformCopy: {
    flex: 1,
  },
  uniformHint: {
    marginTop: 2,
  },
  save: {
    marginTop: spacing.xl,
  },
});
