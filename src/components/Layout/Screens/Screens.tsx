import { Header } from '@/components/Layout';
import { Screens } from '@/types';

// Screen components
import { HomeScreen } from '@/features/wakeonlan/routes/Home';
import { ManageDevicesScreen } from '@/features/devices';
import { AddDeviceScreen } from '@/features/devices/routes/AddDevice';

// Header components
import { BackButton, AddButton, Title } from '@/components/Elements';
import { getHeaderTitle } from '@react-navigation/elements';

import { StyleSheet } from 'react-native';

export const screens: Screens[] = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ManageDevices',
    component: ManageDevicesScreen,
    options: {
      title: 'Manage Devices',
      header: props => {
        const { navigation, options, route } = props;
        const title = getHeaderTitle(options, route.name);

        return (
          <Header
            {...props}
            options={{
              headerLeft: props => (
                <BackButton
                  {...props}
                  canGoBack={true}
                  onPress={() => navigation.goBack()}
                  iconColor="#ffffff"
                  iconSize={14}
                  style={styles.button}
                />
              ),
              headerTitle: props => (
                <Title
                  {...props}
                  titleContainerStyle={styles.titleContainer}
                  titleTextStyle={styles.title}>
                  {title}
                </Title>
              ),
              headerRight: props => (
                <AddButton
                  {...props}
                  canGoBack={false}
                  onPress={() => navigation.navigate('AddDevice')}
                  iconColor="#ffffff"
                  iconSize={14}
                  style={styles.button}
                />
              ),
            }}
          />
        );
      },
    },
  },
  {
    name: 'AddDevice',
    component: AddDeviceScreen,
    options: {
      title: 'Add Device',
      header: props => {
        const { navigation, options, route } = props;
        const title = getHeaderTitle(options, route.name);

        return (
          <Header
            {...props}
            options={{
              headerLeft: props => (
                <BackButton
                  {...props}
                  canGoBack={true}
                  onPress={() => navigation.goBack()}
                  iconColor="#ffffff"
                  iconSize={14}
                  style={styles.button}
                />
              ),
              headerTitle: props => (
                <Title
                  {...props}
                  titleContainerStyle={styles.titleContainer}
                  titleTextStyle={styles.title}>
                  {title}
                </Title>
              ),
            }}
          />
        );
      },
    },
  },
];

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#404951',
    borderRadius: 9999,
    backgroundColor: '#1a232d',
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    marginVertical: 0,
  },
});
