# Banco de dados

Supabase (PostgreSQL). Migrations em `supabase/migrations`, seed em
`supabase/seed.sql`.

```bash
supabase start
supabase db reset      # aplica migrations e roda o seed
```

## Modelo

```
auth.users
   │
   ├─1:1─ profiles
   ├─1:N─ garments
   └─1:N─ looks ─N:N─ look_garments ─ garments
```

Tudo pendurado em `auth.users` com `on delete cascade`: o Supabase é a fonte de
verdade da identidade, e este schema não duplica nada dela além do que a
interface exibe.

## Enums

`garment_category` · `season` · `occasion` · `weather_condition`

Enum em vez de texto livre porque estes valores são vocabulário do produto: a
família de ícones, o motor de recomendação e a interface dependem de que não
exista uma oitava categoria inventada por um cliente.

**Custo.** Adicionar um valor exige migration. É o preço de a interface poder
confiar no conjunto.

## Tabelas

### `profiles`

`id` (= `auth.users.id`) · `name` · `avatar_url` · `preferred_styles[]` ·
`preferred_occasions[]` · timestamps.

Criado por gatilho `on_auth_user_created`, junto com o usuário. Sem isso, a
primeira tela depois do login precisaria tratar "perfil ainda não existe" — um
estado sem sentido.

O nome vem de `full_name`, `name` ou da parte local do e-mail, nessa ordem: cada
provedor entrega em um lugar diferente.

Preferências ficam vazias até MOD-031. A recomendação as usará como **reforço**,
nunca como filtro duro — filtro duro é ocasião e clima.

### `garments`

`id` · `user_id` · `name` · `category` · `color_name` · `color_hex` ·
`material` · `seasons[]` · `occasions[]` · `is_uniform` · `image_path` ·
timestamps.

`color_hex` tem `check` de formato: cor inválida quebra a interface em silêncio.

`image_path` é **caminho no Storage, não URL** — a URL é assinada na leitura.

Índice: `(user_id, category, created_at desc)`. O armário é sempre lido por dono
e quase sempre filtrado por categoria.

### `looks`

`id` · `user_id` · `moment` · `mood` · `summary` · `rationale` · `occasion` ·
`weather_temperature` · `weather_condition` · `image_path` · `created_at`.

**`rationale` é `not null`.** O Modo nunca mostra roupa sem justificar a
escolha, e o banco não deve permitir um look mudo.

Só looks **salvos** viram linha. Recomendações do dia a dia são efêmeras e
recompostas a partir do armário (DEC-008) — a maioria nunca é revisitada e
viraria lixo.

### `look_garments`

`look_id` · `garment_id` · `position`. Chave primária composta.

`position` é a ordem de leitura: parte de cima, parte de baixo, calçado, extras.

## Row Level Security

**RLS ligada em todas as tabelas antes de qualquer política.** Assim um
esquecimento resulta em "ninguém vê nada" e não no contrário.

O armário de alguém é privado por definição: nenhuma tabela tem leitura pública,
e nenhuma política se apoia em coluna vinda do cliente — todas comparam com
`auth.uid()`.

| Tabela          | select       | insert              | update  | delete       |
| --------------- | ------------ | ------------------- | ------- | ------------ |
| `profiles`      | próprio      | — (gatilho)         | próprio | —            |
| `garments`      | próprio      | próprio             | próprio | próprio      |
| `looks`         | próprio      | próprio             | —       | próprio      |
| `look_garments` | via look pai | via look **e** peça | —       | via look pai |

`with check` no insert e no update de `garments` impede o abuso mais óbvio:
gravar uma linha com o `user_id` de outra pessoa.

A junção não tem dono próprio — a dona é a linha de `looks`. O insert exige que
**a peça também** seja do mesmo dono; sem isso alguém poderia montar um look com
a roupa de outra pessoa.

## Storage

Bucket `garments`, **privado**. Caminho: `<user_id>/<garment_id>.png`.

As políticas comparam a primeira pasta com `auth.uid()`. A interface lê por URL
assinada, nunca por link público: a foto do guarda-roupa de alguém não deve ser
adivinhável.

## Seed

`supabase/seed.sql` espelha `src/services/wardrobe/seed.ts` — 16 peças, com duas
de uniforme para exercitar a regra de exclusão. O app com backend começa
exatamente como o modo de demonstração.

O bloco escolhe o primeiro usuário de `auth.users` e não faz nada se não houver
nenhum: seguro de rodar num banco recém-criado.

## Pendências

| Item                                   | Backlog |
| -------------------------------------- | ------- |
| `supabaseWardrobeService`              | MOD-028 |
| `supabaseLookService`                  | MOD-029 |
| Upload e URL assinada                  | MOD-030 |
| Tipos gerados por `supabase gen types` | MOD-028 |
| Verificar RLS com dois usuários reais  | MOD-028 |
