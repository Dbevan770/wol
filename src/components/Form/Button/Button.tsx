import { Pressable, Text } from 'react-native';
import { styles } from './styles';

export const Button = ({ ...props }) => {
  return (
    <Pressable {...props} style={[styles.button, props.style]}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};
