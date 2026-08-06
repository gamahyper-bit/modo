# Design system

Tokens em `src/theme` são a fonte única de verdade. O `tailwind.config.ts` não
define valores — apenas expõe os tokens como classes.

Componentes usam `StyleSheet` alimentado pelos tokens; classes utilitárias ficam
para layout de tela (DEC-004).

## Cores

| Token      | Valor     | Uso                                           |
| ---------- | --------- | --------------------------------------------- |
| `ink`      | `#0D0D0D` | texto primário, ações, superfícies invertidas |
| `graphite` | `#1A1A1A` | —                                             |
| `gray`     | `#6B6B6B` | texto secundário, ícone inativo               |
| `sand`     | `#E7E2DA` | bordas, superfícies suaves, skeleton          |
| `canvas`   | `#F7F5F2` | fundo do app                                  |
| `surface`  | `#FFFFFF` | cards, palco da peça                          |
| `sage`     | `#5E6B57` | **assinatura**                                |

**Sálvia é restrita a quatro usos** (DEC-007): foco de campo, item selecionado,
confirmação e indicador de carga. Nunca em botão, texto corrido ou fundo.

Semânticos (`colors.*`): `background`, `surface`, `surfaceMuted`, `border`,
`borderStrong`, `textPrimary`, `textSecondary`, `textInverse`, `accent`,
`onAccent`, `signature`, `onSignature`, `overlay`, `garmentStage`.

## Tipografia

Display: **Instrument Serif** (SIL OFL). Interface: **Inter**.

O guia de marca pede _PP Editorial New_, comercial — ver DEC-001.

| Variante       | Tamanho/entrelinha        | Uso                           |
| -------------- | ------------------------- | ----------------------------- |
| `displayLarge` | 40/46                     | splash, abertura de login     |
| `display`      | 32/38                     | saudação, título de tela      |
| `title`        | 24/30                     | legenda do look, bottom sheet |
| `headline`     | 17/24                     | nome de peça                  |
| `body`         | 15/22                     | texto corrente                |
| `bodySmall`    | 13/19                     | apoio                         |
| `label`        | 11/14 · +1.2 · caixa alta | rótulo de seção               |
| `caption`      | 12/16                     | metadado                      |

Todo texto passa pelo componente `Text`, para que tamanho, entrelinha, tracking
e caixa cheguem sempre juntos.

## Spacing e radius

Base 4: `xxs` 2 · `xs` 4 · `sm` 8 · `md` 12 · `lg` 16 · `xl` 24 · `2xl` 32 ·
`3xl` 48 · `4xl` 64 · `5xl` 96. Margem de tela: **24**.

Radius: `sm` 6 · `md` 10 · `lg` 14 · `xl` 20 · `2xl` 28 · `full` 999. Cantos
contidos: muito arredondado lê como marketplace.

## Motion

Teto de **280 ms**, verificado em runtime (DEC-005).

| Token             | ms  | Uso                     |
| ----------------- | --- | ----------------------- |
| `instant`         | 100 | feedback de toque       |
| `fast`            | 160 | saída, retorno de press |
| `base`            | 220 | transição de estado     |
| `slow` / `reveal` | 280 | entrada                 |

Loops ficam fora do teto: `spin` 900 ms, `pulse` 1400 ms.

Press: escala 0.97, opacidade 0.90. Desabilitado: opacidade 0.35. Stagger: 40 ms.

"Revelar, não aparecer" — nada entra com salto ou quique.

## Ícones

Interface: Lucide, traço 1.5. Vestuário: desenho próprio no grid 24×24 do logo
FRAME (DEC-006) — camiseta, camisa, casaco, calça, bermuda, calçado, acessório,
cabide.

`AppIcon` resolve as duas famílias sob um nome do produto: a tela pede
`name="calca"` sem saber de onde vem o desenho.

Tamanhos: `sm` 16 · `md` 20 · `lg` 24 · `xl` 28.

## A marca

A geometria do símbolo FRAME vive em `theme/brand.ts` — grid, path da moldura,
espessura do traço e posição do M. Ela tem **dois consumidores**:

| Consumidor             | Onde aparece              |
| ---------------------- | ------------------------- |
| `Logo`                 | cabeçalho, login, galeria |
| `scripts/brand-assets` | ícone, splash e favicon   |

```bash
npm run brand   # regenera todos os PNG de assets/
```

**Por que um script.** "Gerado à mão uma vez" é como o ícone de um app vira uma
versão antiga da marca: o logo em tela atualiza sozinho, o ícone da tela inicial
fica no desenho de seis meses atrás, e a diferença só aparece quando alguém põe
os dois lado a lado. Um teste compara os PNG em disco com o que a geometria
produz agora — mexeu em `brand.ts` e não rodou `npm run brand`, reprova.

**O M é tipografia, não desenho.** O gerador carrega a mesma fonte de display
que o app embarca. Comprar a licença de PP Editorial New (DEC-001) troca o
ícone junto, e é o comportamento certo.

**As margens não são iguais entre os ativos**, e é de propósito: o iOS recorta
em cantos arredondados a partir de uns 22% da borda, o Android recorta a camada
da frente com uma máscara que muda por aparelho, e o favicon vive com 16 pixels.
Cada receita em `scripts/brand-assets.ts` diz por quê.

## Componentes

| Componente              | Variantes                           | Estados            |
| ----------------------- | ----------------------------------- | ------------------ |
| `Text`                  | 8 variantes · 4 tons                | —                  |
| `Button`                | primary · secondary · ghost · md/lg | ✅ 4               |
| `IconButton`            | plain · outlined · filled           | ✅ 4               |
| `Chip`                  | com ícone opcional                  | ✅ 4               |
| `Badge`                 | neutral · solid · outline           | —                  |
| `Card`                  | padded · elevated                   | press              |
| `ClothingCard`          | grid · list · compact               | ✅ 4               |
| `LookCard`              | hero · stacked                      | ✅ 4               |
| `LookBackdrop`          | center · upper                      | —                  |
| `Input`                 | com erro                            | ✅ 4               |
| `FieldRow`              | com adorno                          | ✅ 4               |
| `Search`                | —                                   | ✅ 4               |
| `Toggle`                | —                                   | default · disabled |
| `Modal` / `BottomSheet` | —                                   | —                  |
| `Loading` / `Skeleton`  | —                                   | —                  |
| `EmptyState`            | —                                   | loading            |
| `Avatar`                | foto ou iniciais                    | —                  |
| `BottomNavigation`      | 4 abas                              | ativo/inativo      |

**Regras que valem para todos**

- Loading **não muda a largura**: o rótulo continua medindo a caixa com
  opacidade zero, e o indicador entra sobreposto.
- Disabled entra pelo `usePressMotion`, não por `opacity` no array de estilo — o
  estilo animado também escreve `opacity` e, vindo por último, venceria.
- Botão só com ícone exige `accessibilityLabel`.

### ClothingCard

O componente principal do produto. Quatro slots — `topLeft`, `topRight`,
`bottomLeft`, `bottomRight` — para crescer sem inchar a assinatura. Em modo de
seleção, o canto superior direito pertence ao indicador.

Palco em retrato 3:4 com padding mínimo: a foto ocupa quase todo o card. No grid
a legenda vem desligada por padrão — em três colunas o nome truncava, e nome
truncado informa menos que nome nenhum.

Sem foto, exibe o glifo da própria categoria via `placeholderIcon`.

## Galeria

`/galeria` mostra tudo em todos os estados. Todo componente novo entra nela no
mesmo PR — é onde uma regressão visual aparece antes de chegar num fluxo.

## Armadilhas conhecidas

- `StyleSheet.absoluteFillObject` **não existe** no RN 0.86. Use posicionamento
  explícito.
- Cenário de fundo precisa ser absoluto, não `flex: 1`: como filho em fluxo ele
  divide altura com a legenda e a borda dele vira uma linha atravessando a
  imagem.
- Gradiente de véu com poucas paradas cria banda de Mach. As paradas são
  calculadas a partir de uma curva de potência, não escolhidas a olho.
- Gradiente de cenário nunca deve inverter de direção pelo mesmo motivo.
- Largura percentual com `gap` estoura a linha. Use `space-between` com largura
  fixa.
