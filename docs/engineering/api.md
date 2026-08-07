# API

Contratos entre o app e o que está fora dele. Duas superfícies: as **portas de
serviço** (dentro do app) e as **Edge Functions** (fora).

## Portas de serviço

A interface conversa apenas com estas interfaces. Ver
[`architecture.md`](./architecture.md) para o mecanismo de troca.

### `AuthService`

```ts
getSession(): Promise<Session | undefined>
onSessionChange(listener): () => void
signInWithEmail(email: string): Promise<void>
verifyEmailCode(email: string, code: string): Promise<Session>
signInWith(provider: 'google' | 'apple'): Promise<Session>
signOut(): Promise<void>
```

Dois passos no e-mail de propósito: senha seria mais um campo, e o produto
promete o contrário.

### `WardrobeService`

```ts
list(filter?: { category?, query? }): Promise<Garment[]>
countByCategory(): Promise<Record<GarmentCategory, number>>
add(draft: GarmentDraft): Promise<Garment>
remove(garmentId: string): Promise<void>
analyze(imageUri: string): Promise<GarmentAnalysis>
```

`analyze` é a única operação que vira Edge Function. As demais viram Postgres.

### `RecommendationService`

```ts
getRecommendation(request: {
  occasion?: Occasion;
  adjustments?: LookAdjustment[];
  excludeLookIds?: string[];
}): Promise<Look>
```

`adjustments` chega até o motor: `composeLook` traduz cada um em parâmetro —
régua de formalidade, temperatura sentida, salto dentro de uma categoria — pela
tabela única de `tuning.ts`. Um ajuste novo é uma linha nessa tabela, não um
`if` no compositor (DEC-018).

O ajuste também entra no **id do look**, entre a variante e as peças:

```
l-<ocasião>-<variante>-<ajustes>-<peças>

l-trabalho-0-_-g1.g6.g9.g12.g13              sem ajuste
l-trabalho-0-mais-elegante-g1.g5.g9.g12.g13  a calça reta virou alfaiataria
```

`_` marca a ausência de ajuste; vários ajustes vêm unidos por `+`. Sem esse
segmento, abrir o detalhe de um look ajustado recomporia o look **sem** ajuste,
o id não bateria e a tela acusaria "peça não está mais no armário" — sobre um
look que existia meio segundo antes.

### `LookService`

```ts
getById(lookId: string): Promise<Look>
listSaved(): Promise<Look[]>
save(lookId: string): Promise<void>
remove(lookId: string): Promise<void>
isSaved(lookId: string): Promise<boolean>
```

### `WeatherService`

```ts
current(): Promise<Weather>
```

Mock estável durante a sessão, para que o look reconstruído no detalhe seja
idêntico ao da Home.

---

## Edge Functions

Toda função que fala com o Gemini vive aqui (DEC-003). Secrets:

```bash
supabase secrets set GEMINI_API_KEY=...
supabase functions deploy analyze-garment
```

### `POST /analyze-garment` ✅ escrita · ◻︎ não integrada

Lê os atributos de uma peça a partir da foto.

**Requisição**

```json
{ "imageBase64": "<base64 sem prefixo>", "mimeType": "image/jpeg" }
```

**Resposta 200**

```json
{
  "suggestion": {
    "name": "Camisa de algodão",
    "category": "camisa",
    "color": { "name": "Preto", "hex": "#0D0D0D" },
    "material": "Algodão",
    "seasons": ["outono", "inverno"],
    "occasions": ["trabalho", "noite"],
    "isUniform": false
  }
}
```

**Erros.** `400` corpo inválido · `500` chave ausente · `502` modelo indisponível
ou resposta fora do schema.

**Notas de implementação**

- Schema de saída obrigatório. Sem ele o modelo devolve prosa e a interface vira
  parser de texto livre.
- `temperature: 0.2` — catalogar é precisão, não criatividade.
- A resposta é traduzida para o formato do domínio: trocar de modelo não pode
  vazar para a interface.

**Integração:** MOD-025.

### `POST /remove-background` ◻︎ MOD-024

Função separada de propósito: uma falha de recorte não pode derrubar a leitura
de atributos.

```
{ imageBase64, mimeType } → { imageBase64 }  // PNG com transparência
```

Falha degrada para a foto original — nunca bloqueia o cadastro.

### `POST /rank-look` ◻︎ MOD-026

A segunda camada da recomendação. Recebe candidatos **já validados** pelo motor
determinístico e devolve o escolhido com o texto do stylist.

```
{ candidates: Look[], context: { occasion, weather, preferences } }
  → { chosenId, moment, mood, summary, rationale }
```

A função **não escolhe peça** — ela ranqueia o que já é válido. É o que impede o
produto de virar "ChatGPT de moda" (DEC-002).

Sem rede ou em falha, o app cai no texto local. A Home nunca fica sem look.

---

## Convenções

- **Nenhuma chave de IA no app.** `EXPO_PUBLIC_*` vai para o bundle e é
  extraível.
- **Erro de serviço é mensagem em português, na voz do produto.** Nada de código
  HTTP na tela.
- **Toda porta tem implementação de demonstração.** Um serviço novo sem mock
  quebra o modo de demonstração (DEC-009).
