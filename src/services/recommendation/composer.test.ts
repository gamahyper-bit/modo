import { describe, expect, it } from 'vitest';

import { wardrobeSeed } from '@/services/wardrobe/seed';
import type { Look, LookAdjustment, Weather } from '@/types/look';
import type { Occasion } from '@/types/wardrobe';

import { composeLook } from './composer';
import { formalityOf } from './ranking';

/**
 * O contrato do ajuste.
 *
 * Estes testes existem por causa de um defeito específico: `adjustments` era
 * declarado no contrato, passado pela Home e lido por ninguém. O look mudava de
 * vez em quando, por coincidência de variante, e o usuário concluía que tinha
 * sido ouvido. Um teste por ajuste é o que impede esse silêncio de voltar — é o
 * tipo de defeito que não quebra nada e não aparece em nenhum log.
 *
 * O armário usado é o de demonstração, de propósito: é o que a pessoa que abre
 * o app encontra, e é sobre ele que a promessa precisa se sustentar.
 */

const ALL_OCCASIONS: Occasion[] = [
  'trabalho',
  'casual',
  'noite',
  'encontro',
  'viagem',
];

const EVERY_ADJUSTMENT: LookAdjustment[] = [
  'mais-elegante',
  'mais-casual',
  'esta-frio',
  'esta-calor',
  'outra-calca',
  'outro-calcado',
];

/** 18 graus: o motor já põe casaco (limiar em 20) e ainda não põe bermuda. */
const MILD: Weather = { temperature: 18, condition: 'nublado' };
/** 24 graus: sem casaco, ainda de calça. */
const WARM: Weather = { temperature: 24, condition: 'sol' };

const compose = (
  adjustments: LookAdjustment[] = [],
  weather: Weather = MILD,
  occasion: Occasion = 'trabalho'
): Look => {
  const look = composeLook({
    wardrobe: wardrobeSeed,
    occasion,
    weather,
    variant: 0,
    adjustments,
  });

  if (!look) throw new Error('O armário de demonstração deve montar um look.');
  return look;
};

const piece = (look: Look, ...categories: string[]) =>
  look.garments.find((garment) => categories.includes(garment.category));

const formalitySum = (look: Look) =>
  look.garments.reduce((total, garment) => total + formalityOf(garment), 0);

/** As peças de `b` que não estavam em `a`. */
const added = (a: Look, b: Look) => {
  const before = new Set(a.garments.map((garment) => garment.id));
  return b.garments.filter((garment) => !before.has(garment.id));
};

describe('mais elegante / mais casual', () => {
  it('sobe o conjunto na régua de formalidade', () => {
    const base = compose();
    const formal = compose(['mais-elegante']);

    expect(formalitySum(formal)).toBeGreaterThan(formalitySum(base));
  });

  it('desce o conjunto na régua de formalidade', () => {
    const base = compose();
    const casual = compose(['mais-casual']);

    expect(formalitySum(casual)).toBeLessThan(formalitySum(base));
  });

  it('troca a calça reta pela de alfaiataria no trabalho', () => {
    expect(piece(compose(), 'calca')?.name).toBe('Calça reta');
    expect(piece(compose(['mais-elegante']), 'calca')?.name).toBe(
      'Calça de alfaiataria'
    );
  });

  it('troca a camiseta pela camisa no casual, sem tabela por ocasião', () => {
    // A prioridade de categoria por ocasião não existe mais: quem decide entre
    // camisa e camiseta é a régua, e é por isso que o ajuste consegue mexer
    // nela.
    expect(piece(compose([], MILD, 'casual'), 'camiseta', 'camisa')?.category).toBe(
      'camiseta'
    );
    expect(
      piece(compose(['mais-elegante'], MILD, 'casual'), 'camiseta', 'camisa')
        ?.category
    ).toBe('camisa');
  });

  it('pedidos opostos se cancelam', () => {
    expect(compose(['mais-elegante', 'mais-casual']).garments).toEqual(
      compose().garments
    );
  });
});

describe('está calor / está frio', () => {
  it('tira o casaco quando o usuário diz que está calor', () => {
    expect(piece(compose(), 'casaco')).toBeDefined();
    expect(piece(compose(['esta-calor']), 'casaco')).toBeUndefined();
  });

  it('põe casaco quando o usuário diz que está frio num dia ameno', () => {
    expect(piece(compose([], WARM), 'casaco')).toBeUndefined();
    expect(piece(compose(['esta-frio'], WARM), 'casaco')).toBeDefined();
  });

  it('troca calça por bermuda quando o calor atravessa o limiar', () => {
    expect(piece(compose([], WARM, 'casual'), 'calca')).toBeDefined();
    expect(piece(compose(['esta-calor'], WARM, 'casual'), 'bermuda')).toBeDefined();
  });

  it('não mente sobre a previsão: o clima do look continua sendo o real', () => {
    // O motor decide com a temperatura que o usuário disse sentir, mas o número
    // que aparece na tela é o do termômetro. Quem explica a diferença é a nota
    // do stylist, não um dado adulterado.
    expect(compose(['esta-frio']).weather).toEqual(MILD);
    expect(compose(['esta-frio']).summary).toContain('12 graus');
  });
});

describe('outra calça / outro calçado', () => {
  it('troca só a calça', () => {
    const base = compose();
    const next = compose(['outra-calca']);

    expect(added(base, next)).toHaveLength(1);
    expect(added(base, next)[0]?.category).toBe('calca');
  });

  it('troca só o calçado', () => {
    const base = compose();
    const next = compose(['outro-calcado']);

    expect(added(base, next)).toHaveLength(1);
    expect(added(base, next)[0]?.category).toBe('calcado');
  });
});

describe('o ajuste muda a identidade', () => {
  it('dois ajustes diferentes não são o mesmo look', () => {
    // O formato do id é contrato de `recipe.ts`, e é lá que ele é testado. Aqui
    // interessa só que o compositor de fato o use: um pedido diferente produz
    // um look diferente, e não o mesmo com outro texto.
    const base = compose().id;

    expect(compose(['mais-elegante']).id).not.toBe(base);
    expect(compose(['esta-calor']).id).not.toBe(base);
  });
});

describe('a fala do stylist', () => {
  it('concorda o artigo com o nome da peça, não com a categoria', () => {
    // A régua de formalidade passou a alcançar a bota de camurça, e a bota
    // revelou um erro que o tênis escondia: `calcado` é masculino, "bota" não.
    const elegant = compose(['mais-elegante']);

    expect(elegant.rationale).toContain('A bota de camurça');
    expect(elegant.rationale).not.toContain('O bota');
  });

  it('a frase da Home cabe em uma respiração', () => {
    // A Home mostra uma frase só, inteira, nunca truncada. Passando de umas
    // dezenas de caracteres ela vira quatro linhas e o hero perde o ar — e a
    // saída fácil, cortar com reticências, é justamente a que o tipo `Look`
    // proíbe. O limite é aqui, no texto, não na renderização.
    for (const occasion of ALL_OCCASIONS) {
      expect(compose([], MILD, occasion).summary.length).toBeLessThanOrEqual(80);

      for (const adjustment of EVERY_ADJUSTMENT) {
        expect(
          compose([adjustment], MILD, occasion).summary.length
        ).toBeLessThanOrEqual(80);
      }
    }
  });

  it('concorda o adjetivo com a peça', () => {
    const cold = compose([], { temperature: 12, condition: 'frio' }, 'casual');

    expect(cold.rationale).toContain('a jaqueta leve dá conta sozinha');
  });
});

describe('o que o ajuste não pode quebrar', () => {
  it('toda ocasião oferecida na Home monta um look', () => {
    // A Home oferece as cinco ocasiões como chips. Uma ocasião sem peça
    // estrutural elegível não gera look nenhum, e o chip entrega a tela de
    // erro — foi o que aconteceu com "viagem", que não tinha nem calça nem
    // calçado marcados no armário de demonstração.
    for (const occasion of ALL_OCCASIONS) {
      expect(compose([], MILD, occasion).garments.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('uniforme continua fora de qualquer ocasião que não seja trabalho', () => {
    const uniformIds = wardrobeSeed
      .filter((garment) => garment.isUniform)
      .map((garment) => garment.id);

    for (const occasion of ['casual', 'noite', 'encontro', 'viagem'] as const) {
      for (const adjustment of EVERY_ADJUSTMENT) {
        const look = composeLook({
          wardrobe: wardrobeSeed,
          occasion,
          weather: MILD,
          variant: 0,
          adjustments: [adjustment],
        });

        for (const garment of look?.garments ?? []) {
          expect(uniformIds).not.toContain(garment.id);
        }
      }
    }
  });

  it('o usuário vê que foi ouvido, mesmo quando o look não muda', () => {
    // "Está frio" num dia de 18 graus não tem o que trocar: o casaco já está no
    // look e é o único que serve para trabalho. A resposta certa não é fingir
    // uma troca — é o stylist dizer o que fez com o pedido.
    const base = compose();
    const cold = compose(['esta-frio']);

    expect(cold.garments).toEqual(base.garments);
    expect(cold.moment).toBe('Para o frio.');
    expect(cold.summary).not.toBe(base.summary);
  });
});

describe('a regra do uniforme', () => {
  const UNIFORM_IDS = wardrobeSeed
    .filter((garment) => garment.isUniform)
    .map((garment) => garment.id);

  it('não entra no trabalho enquanto houver alternativa comum', () => {
    // Ordenar não bastava. A peça de uniforme ia para o fim da fila, o que a
    // protegia só na primeira variante — na segunda, "gerar outro" entregava a
    // polo do trabalho com calça de alfaiataria. É o acidente que DEC-011
    // existe para impedir, e ele estava acontecendo.
    for (let variant = 0; variant < 24; variant += 1) {
      const look = composeLook({
        wardrobe: wardrobeSeed,
        occasion: 'trabalho',
        weather: MILD,
        variant,
      });

      for (const garment of look?.garments ?? []) {
        expect(UNIFORM_IDS).not.toContain(garment.id);
      }
    }
  });

  it('entra quando é a única coisa que a vaga tem', () => {
    // Quem de fato vai de uniforme não tem outra camisa de trabalho. Aí a peça
    // precisa aparecer: recusar seria deixar a pessoa sem look.
    const uniformOnly = wardrobeSeed.filter(
      (garment) => garment.category !== 'camisa' && garment.category !== 'camiseta'
    );

    const polo = wardrobeSeed.find((garment) => garment.id === 'g15')!;
    const look = composeLook({
      wardrobe: [...uniformOnly, polo],
      occasion: 'trabalho',
      weather: MILD,
      variant: 0,
    });

    expect(look?.garments.map((garment) => garment.id)).toContain('g15');
  });
});

describe('os limiares de clima', () => {
  const workAt = (temperature: number) =>
    compose([], { temperature, condition: 'nublado' });

  it('põe casaco abaixo de 20 graus e não põe a partir de 20', () => {
    expect(piece(workAt(19), 'casaco')).toBeDefined();
    expect(piece(workAt(20), 'casaco')).toBeUndefined();
  });

  it('veste calça abaixo de 26 graus e bermuda a partir de 26', () => {
    const casualAt = (temperature: number) =>
      compose([], { temperature, condition: 'sol' }, 'casual');

    expect(piece(casualAt(25), 'calca')).toBeDefined();
    expect(piece(casualAt(25), 'bermuda')).toBeUndefined();
    expect(piece(casualAt(26), 'bermuda')).toBeDefined();
    expect(piece(casualAt(26), 'calca')).toBeUndefined();
  });
});

describe('armário incompleto', () => {
  const withoutCategory = (...categories: string[]) =>
    wardrobeSeed.filter((garment) => !categories.includes(garment.category));

  const composeWith = (wardrobe: typeof wardrobeSeed) =>
    composeLook({ wardrobe, occasion: 'trabalho', weather: MILD, variant: 0 });

  it.each([
    ['sem parte de cima', ['camisa', 'camiseta']],
    ['sem parte de baixo', ['calca', 'bermuda']],
    ['sem calçado', ['calcado']],
  ])('não recomenda %s', (_label, categories) => {
    // Melhor não recomendar do que recomendar pela metade: um look sem calçado
    // não é uma versão simplificada, é um defeito.
    expect(composeWith(withoutCategory(...categories))).toBeUndefined();
  });

  it('não recomenda com o armário vazio', () => {
    expect(composeWith([])).toBeUndefined();
  });

  it('recomenda sem casaco e sem acessório — nenhum dos dois é estrutural', () => {
    const look = composeWith(withoutCategory('casaco', 'acessorio'));

    expect(look?.garments).toHaveLength(3);
  });
});

describe('determinismo', () => {
  it('os mesmos parâmetros devolvem o mesmo look', () => {
    // É a propriedade que sustenta o id: sem ela, abrir o detalhe de um look
    // recomporia outra coisa e a tela acusaria uma peça que nunca saiu do
    // armário.
    for (const occasion of ALL_OCCASIONS) {
      for (let variant = 0; variant < 8; variant += 1) {
        const first = composeLook({
          wardrobe: wardrobeSeed,
          occasion,
          weather: MILD,
          variant,
          adjustments: ['mais-elegante'],
        });
        const second = composeLook({
          wardrobe: wardrobeSeed,
          occasion,
          weather: MILD,
          variant,
          adjustments: ['mais-elegante'],
        });

        expect(second).toEqual(first);
      }
    }
  });

  it('a ordem das peças no armário não muda o look', () => {
    // O armário chega ordenado por categoria, e o serviço real pode devolver
    // outra ordem. A escolha precisa vir da regra, não da ordem de chegada.
    const reversed = [...wardrobeSeed].reverse();

    const fromSeed = composeLook({
      wardrobe: wardrobeSeed,
      occasion: 'trabalho',
      weather: MILD,
      variant: 0,
    });
    const fromReversed = composeLook({
      wardrobe: reversed,
      occasion: 'trabalho',
      weather: MILD,
      variant: 0,
    });

    expect(fromReversed?.id).toBe(fromSeed?.id);
  });
});
