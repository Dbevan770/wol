import { useState, useEffect } from 'react';
import { FormFields, defaultValues, deviceSchema } from '../schema/schema';
import { Form } from '@/components/Form';
import { TextInput, StyleSheet, View, Pressable, Text } from 'react-native';
import { useNavigation, useAddDevice } from '@/hooks';

export const AddDeviceForm = () => {
  const { addDevice, isLoading, isError, isSuccess, error, reset } =
    useAddDevice();
  const navigation = useNavigation();
  const [formData, setFormData] = useState<FormFields>(
    defaultValues || {
      name: '',
      mac: '',
    },
  );
  const [formattedMac, setFormattedMac] = useState<string>('');

  const handleSubmit = async (data: FormFields) => {
    const parseResult = deviceSchema.safeParse(data);
    if (!parseResult.success) {
      console.error(parseResult.error);
      return;
    }

    const validatedData = parseResult.data;

    await addDevice(validatedData);
  };

  const handleChange = (target: keyof FormFields, value: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [target]: value,
    }));
  };

  const handleMacChange = (value: string) => {
    const rawMac = value.replace(/[^A-Fa-f0-9]/g, '').toUpperCase();

    const mac = rawMac.replace(/(.{2})(?=[A-Fa-f0-9])/g, '$1:').toUpperCase();
    handleChange('mac', mac);
    setFormattedMac(mac);
  };

  const handleBlur = (target: keyof Omit<FormFields, 'status'>) => {
    const trimmedValue = formData[target]?.trim();
    if (!trimmedValue) return;
    handleChange(target, trimmedValue);
  };

  useEffect(() => {
    if (isError) {
      console.log(error);
      return;
    }

    if (isSuccess) {
      console.log('Successfully added device');
      reset();
      navigation.navigate('ManageDevices');
    }
  }, [isSuccess, isError, error]);

  return (
    <Form style={styles.form} onSubmit={handleSubmit}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          id="name"
          placeholder="Device Name"
          value={formData.name}
          onChangeText={value => handleChange('name', value)}
          onBlur={() => handleBlur('name')}
          maxLength={64}
          aria-disabled={isLoading}
        />
        <TextInput
          style={styles.input}
          id="mac"
          placeholder="MAC Address"
          value={formattedMac}
          onChangeText={handleMacChange}
          onBlur={() => handleBlur('mac')}
          maxLength={17}
          aria-disabled={isLoading}
        />
        <TextInput
          style={styles.input}
          id="ip"
          placeholder="IP Address (optional)"
          value={formData.ip}
          onChangeText={value => handleChange('ip', value)}
          onBlur={() => handleBlur('ip')}
          maxLength={16}
          aria-aria-disabled={isLoading}
        />
      </View>
      <Pressable
        onPress={() => handleSubmit(formData)}
        style={styles.submitButton}
        disabled={isLoading}>
        <Text style={styles.buttonText}>Add Device</Text>
      </Pressable>
    </Form>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    paddingHorizontal: 32,
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
  },
  input: {
    backgroundColor: 'hsl(222, 33%, 6%)',
    width: '100%',
    height: 56,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#404951',
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#ffffff',
    fontSize: 24,
  },
  submitButton: {
    marginTop: 32,
    flex: 1,
    width: '100%',
    height: 56,
    backgroundColor: '#2cb68c',
    borderWidth: 2,
    borderColor: '#5cd7b2',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
