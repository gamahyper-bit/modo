import { router, useLocalSearchParams } from 'expo-router';

import { LookScreen } from '@/features/look';

export default function LookRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const close = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    // Aberto por link direto: não há para onde voltar, então a Home é o destino.
    router.replace('/');
  };

  return <LookScreen lookId={id} onClose={close} />;
}
