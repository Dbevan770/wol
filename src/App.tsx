import { AppProvider } from '@/providers/app';
import { AppScreens } from '@/routes';

export const App = () => {
  return (
    <AppProvider>
      <AppScreens />
    </AppProvider>
  );
};
