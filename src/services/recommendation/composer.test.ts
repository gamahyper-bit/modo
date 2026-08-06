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

describe('o ajuste fica no id', () => {
  it('marca a ausência de ajuste com um espaço reservado', () => {
    expect(compose().id.split('-')[3]).toBe('_');
  });

  it('carrega o ajuste, para o detalhe reconstruir o mesmo look', () => {
    // Sem isto, abrir um look ajustado recomporia o look sem ajuste, o id não
    // bateria e a tela acusaria "peça não está mais no armário" — sobre um look
    // que existia meio segundo antes.
    const id = compose(['mais-elegante']).id;
    const segments = id.split('-');

    expect(segments.slice(3, -1).join('-')).toBe('mais-elegante');
    expect(id).not.toBe(compose().id);
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

  it('concorda o adjetivo com a peça', () => {
    const cold = compose([], { temperature: 12, condition: 'frio' }, 'casual');

    expect(cold.rationale).toContain('a jaqueta leve dá conta sozinha');
  });
});

describe('o que o ajuste não pode quebrar', () => {
  it('uniforme continua fora de qualquer ocasião que não seja trabalho', () => {
    const uniformIds = wardrobeSeed
      .filter((garment) => garment.isUniform)
      .map((garment) => garment.id);

    const everyAdjustment: LookAdjustment[] = [
      'mais-elegante',
      'mais-casual',
      'esta-frio',
      'esta-calor',
      'outra-calca',
      'outro-calcado',
    ];

    for (const occasion of ['casual', 'noite', 'encontro', 'viagem'] as const) {
      for (const adjustment of everyAdjustment) {
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
