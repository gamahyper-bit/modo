## Objetivo

<!-- Uma frase. Qual item do backlog isto entrega? -->

Backlog: MOD-000 · Epic: EPIC-00 · Impacto: 0/5

## Qual hipótese de produto esta entrega valida?

<!--
Uma afirmação que pode estar errada. Três partes:
1. o que acreditamos
2. o que confirmaria
3. o que REFUTARIA — se não dá para refutar, não é hipótese, é torcida

Não repita o objetivo com outras palavras.
-->

## Qual jornada isto aproxima de utilizável?

<!--
J1 primeiro uso · J2 a manhã · J3 crescer o armário · J4 reencontrar um look ·
J5 confiar no produto

De qual estado para qual estado. Ver docs/product/journeys.md.
-->

## Arquivos alterados

<!-- Agrupe por intenção, não por pasta. O diff mostra o quê; aqui vai o porquê. -->

## Decisões tomadas

<!--
Registre o que custaria caro redescobrir. Decisão estrutural vira entrada em
docs/decisions.md — cite o DEC aqui.
-->

## Riscos

<!--
O que pode quebrar, e o que não foi coberto. "Nenhum" é uma resposta válida,
desde que seja verdade.
-->

## Como testar

```bash
npm install
npm run web
```

<!-- Passos exatos. Se depende de configuração ou credencial, diga qual. -->

## Screenshots

<!--
Toda mudança visual precisa de print em 390×844. Antes e depois quando for
ajuste de algo existente.
-->

## Checklist

- [ ] Código implementado
- [ ] `npm run typecheck` limpo
- [ ] `npm run lint` limpo
- [ ] Build funcionando (`npx expo export --platform web`)
- [ ] Screenshot atualizado
- [ ] Documentação atualizada
- [ ] `docs/changelog.md` atualizado
- [ ] Status do item alterado em `docs/product/backlog.md`
- [ ] Estado da jornada revisado em `docs/product/journeys.md`
- [ ] Componente novo adicionado à `/galeria`
- [ ] Texto novo passa pelo checklist de `docs/brand/copy.md`
