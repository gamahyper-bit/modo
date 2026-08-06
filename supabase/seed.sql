-- Modo — armário de demonstração.
--
-- Espelha `src/services/wardrobe/seed.ts`, para que o app com backend comece
-- exatamente como o modo de demonstração. Rode só em ambiente local:
--
--   supabase db reset
--
-- Requer um usuário já existente. O bloco abaixo escolhe o primeiro de
-- `auth.users` e não faz nada se não houver nenhum — assim o seed é seguro de
-- rodar mesmo num banco recém-criado.

do $$
declare
  demo_user uuid;
begin
  select id into demo_user from auth.users order by created_at limit 1;

  if demo_user is null then
    raise notice 'Nenhum usuário em auth.users — seed do armário ignorado.';
    return;
  end if;

  delete from public.garments where user_id = demo_user;

  insert into public.garments
    (user_id, name, category, color_name, color_hex, material, seasons, occasions, is_uniform)
  values
    (demo_user, 'Camisa de algodão',    'camisa',    'Preto',   '#0D0D0D', 'Algodão',           '{outono,inverno,primavera}',        '{trabalho,noite,encontro}', false),
    (demo_user, 'Camisa de linho',      'camisa',    'Areia',   '#E7E2DA', 'Linho',             '{primavera,verao}',                 '{casual,viagem,encontro}',  false),
    (demo_user, 'Camiseta de malha',    'camiseta',  'Areia',   '#E7E2DA', 'Algodão pima',      '{primavera,verao}',                 '{casual,viagem}',           false),
    (demo_user, 'Camiseta lisa',        'camiseta',  'Preto',   '#0D0D0D', 'Algodão',           '{primavera,verao,outono}',          '{casual,noite,viagem}',     false),
    (demo_user, 'Calça de alfaiataria', 'calca',     'Areia',   '#E7E2DA', 'Lã fria',           '{outono,inverno,primavera}',        '{trabalho,encontro,noite}', false),
    (demo_user, 'Calça reta',           'calca',     'Preto',   '#0D0D0D', 'Sarja',             '{outono,inverno}',                  '{casual,noite,trabalho}',   false),
    (demo_user, 'Calça de moletom',     'calca',     'Grafite', '#1A1A1A', 'Moletom',           '{outono,inverno}',                  '{casual}',                  false),
    (demo_user, 'Bermuda de sarja',     'bermuda',   'Areia',   '#E7E2DA', 'Sarja',             '{verao,primavera}',                 '{casual,viagem}',           false),
    (demo_user, 'Casaco de lã',         'casaco',    'Grafite', '#1A1A1A', 'Lã',                '{outono,inverno}',                  '{trabalho,noite,encontro}', false),
    (demo_user, 'Jaqueta leve',         'casaco',    'Areia',   '#E7E2DA', 'Algodão encerado',  '{primavera,outono}',                '{casual,viagem}',           false),
    (demo_user, 'Tênis de couro',       'calcado',   'Branco',  '#F7F5F2', 'Couro',             '{primavera,verao,outono}',          '{casual,trabalho,encontro}',false),
    (demo_user, 'Bota de camurça',      'calcado',   'Grafite', '#1A1A1A', 'Camurça',           '{outono,inverno}',                  '{noite,encontro,trabalho}', false),
    (demo_user, 'Bolsa de couro',       'acessorio', 'Grafite', '#1A1A1A', 'Couro',             '{primavera,verao,outono,inverno}',  '{trabalho,viagem}',         false),
    (demo_user, 'Cinto de couro',       'acessorio', 'Preto',   '#0D0D0D', 'Couro',             '{primavera,verao,outono,inverno}',  '{trabalho,noite,encontro}', false),
    -- Uniforme: existe para exercitar a regra de exclusão em looks casuais.
    (demo_user, 'Polo do trabalho',     'camiseta',  'Grafite', '#1A1A1A', 'Piquê',             '{primavera,verao,outono,inverno}',  '{trabalho}',                true),
    (demo_user, 'Calça do uniforme',    'calca',     'Preto',   '#0D0D0D', 'Poliéster',         '{primavera,verao,outono,inverno}',  '{trabalho}',                true);

  raise notice 'Armário de demonstração criado para %', demo_user;
end
$$;
