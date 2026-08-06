-- Modo — schema inicial.
--
-- Três tabelas de domínio (perfis, peças, looks) mais a tabela de junção que
-- descreve a composição de um look. Tudo em `public`, tudo pendurado em
-- `auth.users`: o Supabase é a fonte de verdade da identidade, e este schema
-- não duplica nada dela além do que a interface precisa exibir.

-- ---------------------------------------------------------------------------
-- Enums
--
-- Enum em vez de texto livre porque estes valores são vocabulário do produto:
-- a família de ícones, as regras do motor de recomendação e a interface
-- dependem de que não exista uma oitava categoria inventada por um cliente.
-- ---------------------------------------------------------------------------

create type garment_category as enum (
  'camiseta', 'camisa', 'casaco', 'calca', 'bermuda', 'calcado', 'acessorio'
);

create type season as enum ('primavera', 'verao', 'outono', 'inverno');

create type occasion as enum (
  'trabalho', 'casual', 'noite', 'encontro', 'viagem'
);

create type weather_condition as enum ('sol', 'nublado', 'chuva', 'frio');

-- ---------------------------------------------------------------------------
-- Perfis
-- ---------------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default 'Você',
  avatar_url text,
  -- Preferências do onboarding. Vazias até ele existir; a recomendação usa
  -- como reforço, nunca como filtro duro — filtro duro é ocasião e clima.
  preferred_styles text[] not null default '{}',
  preferred_occasions occasion[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Peças
-- ---------------------------------------------------------------------------

create table public.garments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  category garment_category not null,
  color_name text not null,
  color_hex text not null check (color_hex ~ '^#[0-9A-Fa-f]{6}$'),
  material text,
  seasons season[] not null default '{}',
  occasions occasion[] not null default '{}',
  -- Uniforme de trabalho. O motor exclui estas peças de qualquer look que não
  -- seja de trabalho, e as deixa por último mesmo lá: uniforme se veste como
  -- conjunto, não misturado.
  is_uniform boolean not null default false,
  -- Caminho no Storage, não URL: a URL é gerada assinada na leitura.
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- O armário é sempre lido por dono, quase sempre filtrado por categoria.
create index garments_user_category_idx
  on public.garments (user_id, category, created_at desc);

-- ---------------------------------------------------------------------------
-- Looks
--
-- Um look é guardado só quando o usuário o salva. As recomendações do dia a dia
-- são efêmeras e não ocupam banco — são recompostas a partir do armário.
-- ---------------------------------------------------------------------------

create table public.looks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  moment text not null,
  mood text not null,
  summary text not null,
  -- A explicação do stylist. `not null` de propósito: o Modo nunca mostra roupa
  -- sem justificar a escolha, e o banco não deve permitir um look mudo.
  rationale text not null,
  occasion occasion not null,
  weather_temperature smallint,
  weather_condition weather_condition,
  image_path text,
  created_at timestamptz not null default now()
);

create index looks_user_idx on public.looks (user_id, created_at desc);

create table public.look_garments (
  look_id uuid not null references public.looks (id) on delete cascade,
  garment_id uuid not null references public.garments (id) on delete cascade,
  -- Ordem de leitura do look: parte de cima, parte de baixo, calçado, extras.
  position smallint not null,
  primary key (look_id, garment_id)
);

create index look_garments_garment_idx on public.look_garments (garment_id);

-- ---------------------------------------------------------------------------
-- Gatilhos
-- ---------------------------------------------------------------------------

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger profiles_touch
  before update on public.profiles
  for each row execute function public.touch_updated_at();

create trigger garments_touch
  before update on public.garments
  for each row execute function public.touch_updated_at();

-- Cria o perfil junto com o usuário. Sem isso a primeira tela depois do login
-- precisaria tratar "perfil ainda não existe", que é um estado sem sentido.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1),
      'Você'
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
