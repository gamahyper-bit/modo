-- Modo — Row Level Security.
--
-- Princípio: o armário de alguém é privado por definição. Nenhuma tabela deste
-- schema tem leitura pública, e nenhuma política se apoia em coluna vinda do
-- cliente — todas comparam com `auth.uid()`.
--
-- RLS é ligada em todas as tabelas antes de qualquer política, para que um
-- esquecimento resulte em "ninguém vê nada" e não em "todo mundo vê tudo".

alter table public.profiles       enable row level security;
alter table public.garments       enable row level security;
alter table public.looks          enable row level security;
alter table public.look_garments  enable row level security;

-- ---------------------------------------------------------------------------
-- Perfis — cada um enxerga e edita apenas o próprio.
--
-- Sem política de INSERT: o perfil nasce do gatilho `on_auth_user_created`,
-- que roda como `security definer`. Cliente nenhum cria perfil.
-- ---------------------------------------------------------------------------

create policy "perfil próprio: ler"
  on public.profiles for select
  using (auth.uid() = id);

create policy "perfil próprio: atualizar"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- Peças
--
-- `with check` no insert e no update impede o caso mais óbvio de abuso:
-- gravar uma linha com o `user_id` de outra pessoa.
-- ---------------------------------------------------------------------------

create policy "peças próprias: ler"
  on public.garments for select
  using (auth.uid() = user_id);

create policy "peças próprias: inserir"
  on public.garments for insert
  with check (auth.uid() = user_id);

create policy "peças próprias: atualizar"
  on public.garments for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "peças próprias: remover"
  on public.garments for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Looks
-- ---------------------------------------------------------------------------

create policy "looks próprios: ler"
  on public.looks for select
  using (auth.uid() = user_id);

create policy "looks próprios: inserir"
  on public.looks for insert
  with check (auth.uid() = user_id);

create policy "looks próprios: remover"
  on public.looks for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Composição do look
--
-- A junção não tem `user_id` próprio: a dona é a linha de `looks`. As políticas
-- perguntam ao look pai, e o insert exige que a peça também seja do mesmo dono
-- — sem isso alguém poderia montar um look com a roupa de outra pessoa.
-- ---------------------------------------------------------------------------

create policy "composição própria: ler"
  on public.look_garments for select
  using (
    exists (
      select 1 from public.looks l
      where l.id = look_id and l.user_id = auth.uid()
    )
  );

create policy "composição própria: inserir"
  on public.look_garments for insert
  with check (
    exists (
      select 1 from public.looks l
      where l.id = look_id and l.user_id = auth.uid()
    )
    and exists (
      select 1 from public.garments g
      where g.id = garment_id and g.user_id = auth.uid()
    )
  );

create policy "composição própria: remover"
  on public.look_garments for delete
  using (
    exists (
      select 1 from public.looks l
      where l.id = look_id and l.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Storage — fotos das peças
--
-- Bucket privado. O caminho de cada arquivo começa pelo id do dono
-- (`<user_id>/<garment_id>.png`), e as políticas comparam a primeira pasta com
-- `auth.uid()`. A interface lê por URL assinada, nunca por link público: a foto
-- do guarda-roupa de alguém não deve ser adivinhável.
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('garments', 'garments', false)
on conflict (id) do nothing;

create policy "fotos próprias: ler"
  on storage.objects for select
  using (
    bucket_id = 'garments'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "fotos próprias: enviar"
  on storage.objects for insert
  with check (
    bucket_id = 'garments'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "fotos próprias: remover"
  on storage.objects for delete
  using (
    bucket_id = 'garments'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
