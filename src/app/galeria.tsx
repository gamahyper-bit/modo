import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AppIcon,
  Avatar,
  Badge,
  BottomNavigation,
  Button,
  Card,
  Chip,
  ClothingCard,
  EmptyState,
  FieldRow,
  IconButton,
  Input,
  Loading,
  Logo,
  LookCard,
  NAV_ITEMS,
  Search,
  Text,
  Toggle,
  type AppIconName,
} from '@/components';
import { colors, spacing, typography, type TypographyToken } from '@/theme';

/**
 * Galeria do design system.
 *
 * Superfície de revisão: cada componente aparece em todos os estados, na mesma
 * tela, para que uma regressão visual seja vista antes de chegar num fluxo.
 * É daqui que saem os prints de revisão de UX.
 */
export default function Galeria() {
  const insets = useSafeAreaInsets();
  const [busca, setBusca] = useState('');
  const [chipAtivo, setChipAtivo] = useState('elegante');
  const [uniforme, setUniforme] = useState(true);

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + spacing.xl },
        ]}
      >
        <Section title="Marca">
          <View style={styles.marca}>
            <Logo variant="wordmark" size={72} />
            <Logo variant="mark" size={48} />
          </View>
        </Section>

        <Section title="Tipografia">
          {(
            [
              'displayLarge',
              'display',
              'title',
              'headline',
              'body',
              'bodySmall',
              'label',
              'caption',
            ] as TypographyToken[]
          ).map((token) => (
            <View key={token} style={styles.typeRow}>
              <Text variant={token} numberOfLines={1}>
                Revela a melhor escolha
              </Text>
              <Text variant="caption" tone="secondary">
                {token} · {typography[token].fontSize}/
                {typography[token].lineHeight}
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Família própria — vestuário">
          <View style={styles.icons}>
            {(
              [
                'camiseta',
                'camisa',
                'casaco',
                'calca',
                'bermuda',
                'calcado',
                'acessorio',
                'cabide',
              ] as AppIconName[]
            ).map((name) => (
              <View key={name} style={styles.iconCell}>
                <AppIcon name={name} size={28} color={colors.textPrimary} />
                <Text variant="caption" tone="secondary">
                  {name}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Interface — Lucide">
          <View style={styles.icons}>
            {(
              [
                'home',
                'looks',
                'perfil',
                'buscar',
                'filtrar',
                'adicionar',
                'gerarOutro',
                'salvar',
                'camera',
                'calor',
                'frio',
                'chuva',
              ] as AppIconName[]
            ).map((name) => (
              <View key={name} style={styles.iconCell}>
                <AppIcon name={name} size={24} color={colors.textPrimary} />
                <Text variant="caption" tone="secondary">
                  {name}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        <Section title="Button — primary">
          <Button label="Salvar peça" />
          <Button label="Salvar peça" disabled />
          <Button label="Salvar peça" loading />
        </Section>

        <Section title="Button — secondary e ghost">
          <Button label="Usar este look" variant="secondary" icon="salvar" />
          <Button label="Usar este look" variant="secondary" loading />
          <Button label="Gerar outro" variant="ghost" icon="gerarOutro" />
          <Button label="Gerar outro" variant="ghost" disabled />
        </Section>

        <Section title="IconButton">
          <View style={styles.row}>
            <IconButton icon="buscar" accessibilityLabel="Buscar" />
            <IconButton
              icon="adicionar"
              accessibilityLabel="Adicionar"
              variant="outlined"
            />
            <IconButton
              icon="confirmar"
              accessibilityLabel="Confirmar"
              variant="filled"
            />
            <IconButton icon="mais" accessibilityLabel="Mais" disabled />
            <IconButton icon="salvar" accessibilityLabel="Salvar" loading />
          </View>
        </Section>

        <Section title="Chip">
          <View style={styles.wrap}>
            {[
              { key: 'tenis', label: 'Outro tênis', icon: 'calcado' },
              { key: 'calca', label: 'Outra calça', icon: 'calca' },
              { key: 'elegante', label: 'Mais elegante' },
              { key: 'calor', label: 'Está calor', icon: 'calor' },
            ].map((chip) => (
              <Chip
                key={chip.key}
                label={chip.label}
                icon={chip.icon as AppIconName | undefined}
                selected={chipAtivo === chip.key}
                onPress={() => setChipAtivo(chip.key)}
              />
            ))}
            <Chip label="Indisponível" disabled />
            <Chip label="Aplicando" loading />
          </View>
        </Section>

        <Section title="ClothingCard — grid, seleção e slots">
          <View style={styles.grid}>
            <ClothingCard
              name="Camisa de algodão"
              meta="Preto · Trabalho"
              onPress={() => {}}
              slots={{ bottomLeft: <Badge label="Uniforme" /> }}
            />
            <ClothingCard
              name="Calça alfaiataria"
              meta="Areia · Trabalho"
              selection="selected"
              onPress={() => {}}
            />
            <ClothingCard
              name="Tênis branco"
              meta="Branco · Casual"
              selection="selectable"
              showCaption
              onPress={() => {}}
            />
          </View>
        </Section>

        <Section title="ClothingCard — lista, compacto e carregando">
          <ClothingCard
            variant="list"
            name="Casaco de lã"
            meta="Grafite · Outono / Inverno"
            onPress={() => {}}
          />
          <ClothingCard variant="list" loading />
          <View style={styles.row}>
            <ClothingCard variant="compact" />
            <ClothingCard variant="compact" />
            <ClothingCard variant="compact" loading />
          </View>
        </Section>

        <Section title="LookCard — emoção antes da ocasião">
          <LookCard
            moment="Hoje."
            mood="Confiante e contemporâneo."
            context="Trabalho · 18°C"
            onPress={() => {}}
          />
        </Section>

        <Section title="FieldRow — o formulário do produto">
          <Card>
            <FieldRow label="Categoria" value="Camisa" onPress={() => {}} />
            <FieldRow
              label="Cor"
              value="Preto"
              onPress={() => {}}
              adornment={<View style={styles.amostra} />}
            />
            <FieldRow label="Estação" value="Outono / Inverno" onPress={() => {}} />
            <FieldRow label="Ocasião" onPress={() => {}} />
            <FieldRow label="Material" loading last />
          </Card>
        </Section>

        <Section title="Input e Search">
          <Input label="E-mail" placeholder="voce@email.com" />
          <Input
            label="E-mail"
            value="nao-e-um-email"
            error="Digite um e-mail válido."
          />
          <Input label="Verificando" value="voce@email.com" loading />
          <Search value={busca} onChangeText={setBusca} />
          <Search value="camisa" onChangeText={() => {}} loading />
        </Section>

        <Section title="Toggle">
          <View style={styles.row}>
            <Toggle
              value={uniforme}
              onChange={setUniforme}
              accessibilityLabel="Uniforme de trabalho"
            />
            <Text variant="body" tone="secondary">
              Uniforme de trabalho
            </Text>
          </View>
          <View style={styles.row}>
            <Toggle
              value
              onChange={() => {}}
              accessibilityLabel="Desabilitado"
              disabled
            />
            <Text variant="body" tone="secondary">
              Desabilitado
            </Text>
          </View>
        </Section>

        <Section title="Badge, Avatar e Loading">
          <View style={styles.row}>
            <Badge label="Uniforme" />
            <Badge label="Novo" tone="solid" />
            <Badge label="Lavanderia" tone="outline" />
          </View>
          <View style={styles.row}>
            <Avatar name="Gabriel Gama" />
            <Avatar name="Modo" size={40} />
            <Loading />
          </View>
        </Section>

        <Section title="EmptyState">
          <EmptyState
            title={'Seu guarda-roupa\ntem mais potencial\ndo que parece.'}
            description="Fotografe as peças que você mais usa."
            actionLabel="Adicionar primeira peça"
            onAction={() => {}}
          />
        </Section>
      </ScrollView>

      <BottomNavigation items={NAV_ITEMS} activeKey="armario" onSelect={() => {}} />
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text variant="label" tone="secondary">
        {title}
      </Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing['3xl'],
    gap: spacing['2xl'],
  },
  section: {
    gap: spacing.lg,
  },
  sectionBody: {
    gap: spacing.md,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing['2xl'],
  },
  typeRow: {
    gap: 2,
  },
  icons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  iconCell: {
    width: 64,
    alignItems: 'center',
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  amostra: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.textPrimary,
  },
});
