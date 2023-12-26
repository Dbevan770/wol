import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@/hooks/useNavigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight, faGear } from '@fortawesome/free-solid-svg-icons';

import { PowerOn } from './PowerOn';

import { styles } from './styles';

export const HomePage = () => {
  const navigation = useNavigation<'Home'>();
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Wake On Lan</Text>
      </View>
      <PowerOn />
      <View style={styles.footer}>
        <Pressable
          style={styles.devicesButton}
          onPress={() => navigation.navigate('ManageDevices')}>
          <FontAwesomeIcon icon={faGear} size={24} color="#e1e1e1" />
          <Text style={styles.buttonText}>Manage Devices</Text>
          <FontAwesomeIcon icon={faChevronRight} size={16} color="#e1e1e1" />
        </Pressable>
      </View>
    </View>
  );
};
