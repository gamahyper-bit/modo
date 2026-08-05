import { router } from 'expo-router';

import { AddGarmentScreen } from '@/features/wardrobe';

export default function NovaPecaRoute() {
  const back = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/armario');
  };

  return <AddGarmentScreen onDone={back} onCancel={back} />;
}
