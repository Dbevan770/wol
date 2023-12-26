import { useStackContext } from '@/hooks/useStackContext';
import { Navigator } from '@/components/Navigation';
import { screens } from '@/components/Layout';

export const AppScreens = () => {
  const { Screen } = useStackContext();

  const appScreens = screens;
  return (
    <Navigator initialRouteName="Home">
      {appScreens.map((screen, idx) => (
        <Screen key={idx} {...screen} />
      ))}
    </Navigator>
  );
};
