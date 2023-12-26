import { TextInput as ReactTextInput, TextInputProps } from 'react-native';
import { styles } from './styles';

export const TextInput = ({ ...props }: TextInputProps) => {
  return <ReactTextInput {...props} style={[styles.textInput, props.style]} />;
};
