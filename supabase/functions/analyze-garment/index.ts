/**
 * analyze-garment — a leitura da peça.
 *
 * É a única parte do produto que fala com o Gemini, e existe como Edge Function
 * exatamente por isso: um bundle de React Native é extraível, então a chave da
 * API não pode viver no app. O cliente manda a foto e recebe atributos; a chave
 * nunca sai daqui.
 *
 * Contrato — espelha `GarmentAnalysis` em `src/services/wardrobe/types.ts`:
 *
 *   POST { imageBase64: string, mimeType: string }
 *   200  { suggestion: { name, category, color, material, seasons, occasions,
 *                        isUniform } }
 *
 * A remoção de fundo NÃO acontece aqui. É outra chamada, a outro modelo, e
 * merece função própria — misturar as duas faria uma falha de recorte derrubar
 * também a leitura de atributos.
 *
 * Secrets necessários:
 *   supabase secrets set GEMINI_API_KEY=...
 */

// Confira o modelo vigente antes de publicar: a família muda de nome com mais
// frequência do que este arquivo será revisitado.
const MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const CATEGORIES = [
  'camiseta',
  'camisa',
  'casaco',
  'calca',
  'bermuda',
  'calcado',
  'acessorio',
];
const SEASONS = ['primavera', 'verao', 'outono', 'inverno'];
const OCCASIONS = ['trabalho', 'casual', 'noite', 'encontro', 'viagem'];

/**
 * Schema de saída obrigatório.
 *
 * Sem ele o modelo devolve prosa, e a interface passa a fazer parsing de texto
 * livre — que é onde este tipo de integração quebra em produção.
 */
const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    category: { type: 'string', enum: CATEGORIES },
    colorName: { type: 'string' },
    colorHex: { type: 'string' },
    material: { type: 'string' },
    seasons: { type: 'array', items: { type: 'string', enum: SEASONS } },
    occasions: { type: 'array', items: { type: 'string', enum: OCCASIONS } },
    isUniform: { type: 'boolean' },
  },
  required: [
    'name',
    'category',
    'colorName',
    'colorHex',
    'seasons',
    'occasions',
    'isUniform',
  ],
};

const PROMPT = `Você cataloga o guarda-roupa de uma pessoa.

Olhe a peça na foto e descreva o que ela é. Regras:

- O nome é curto e concreto, como alguém descreveria a própria roupa:
  "Camisa de algodão", "Tênis de couro". Nunca invente marca, nunca use
  adjetivo de vitrine ("elegante", "versátil", "must-have").
- A cor é a dominante da peça, com o hex aproximado.
- Estações e ocasiões são onde a peça faz sentido, não onde poderia caber.
  Prefira poucas e certas a muitas e vagas.
- isUniform só é verdadeiro quando a peça é claramente uniforme corporativo
  ou farda — logotipo bordado, tecido e corte padronizados.

Responda apenas com o JSON do schema.`;

Deno.serve(async (request: Request) => {
  if (request.method !== 'POST') {
    return json({ error: 'Método não permitido.' }, 405);
  }

  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) {
    return json({ error: 'GEMINI_API_KEY não configurada.' }, 500);
  }

  let body: { imageBase64?: string; mimeType?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Corpo inválido.' }, 400);
  }

  const { imageBase64, mimeType = 'image/jpeg' } = body;
  if (!imageBase64) {
    return json({ error: 'imageBase64 é obrigatório.' }, 400);
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { inline_data: { mime_type: mimeType, data: imageBase64 } },
            { text: PROMPT },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
        // Catalogar é tarefa de precisão, não de criatividade.
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Gemini respondeu', response.status, detail);
    return json({ error: 'Não consegui ler esta peça.' }, 502);
  }

  const payload = await response.json();
  const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (typeof text !== 'string') {
    return json({ error: 'Resposta inesperada do modelo.' }, 502);
  }

  let read: Record<string, unknown>;
  try {
    read = JSON.parse(text);
  } catch {
    return json({ error: 'Resposta inesperada do modelo.' }, 502);
  }

  // Traduz para o formato do domínio. O app não deve conhecer o formato do
  // provedor — trocar de modelo não pode vazar para a interface.
  return json({
    suggestion: {
      name: read.name,
      category: read.category,
      color: { name: read.colorName, hex: read.colorHex },
      material: read.material ?? undefined,
      seasons: read.seasons,
      occasions: read.occasions,
      isUniform: read.isUniform === true,
    },
  });
});

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
