import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewDevice, Device } from '@/types';
import { generateUuid } from './uuid';
import { APIResponse } from '@/types';

type StoreDataProps = {
  newDevice: NewDevice;
};

/* This is a custom 'API' that uses AsyncStorage to store
 * and receive data from the device. It's not a real API,
 * but it more or less simulates the actions of one.
 */

/* Store data method, new device is passed as an argument
 * which contains only a few properties
 * - name: string
 * - mac: string
 * - ip: string (optional)
 */

export const storeData = async ({
  newDevice,
}: StoreDataProps): Promise<APIResponse> => {
  try {
    // Generate a UUID for the device
    const id = generateUuid();

    // Create a new Date object for the createdAt property
    const createdAt = new Date();

    // Create a new device object with the new properties
    const device: Device = {
      ...newDevice,
      id,
      status: 'UNKNOWN',
      createdAt,
    };

    // Convert the device object to JSON and store
    // it in AsyncStorage using the UUID as the key
    const jsonValue = JSON.stringify(device);
    await AsyncStorage.setItem(id, jsonValue);
    return { status: 200, data: device, msg: 'Device added successfully' };
  } catch (e) {
    const msg = handleError(e);
    return { status: 500, data: null, msg: msg };
  }
};

/* Remove data method, takes the UUID of the device
 * as an argument and removes it from AsyncStorage
 */

export const removeData = async (id: string): Promise<APIResponse> => {
  try {
    await AsyncStorage.removeItem(id);
    return { status: 200, data: null, msg: 'Device removed successfully' };
  } catch (e) {
    const msg = handleError(e);
    return { status: 500, data: null, msg: msg };
  }
};

/* Get data method, takes the UUID of the device
 * as an argument and returns the device object
 * from AsyncStorage
 */

export const getData = async (id: string): Promise<APIResponse> => {
  try {
    const data = await AsyncStorage.getItem(id);
    if (data === null) throw new Error('Device not found');

    try {
      const device = JSON.parse(data) as Device;
      return { status: 200, data: device, msg: 'Device found' };
    } catch (e) {
      console.error(`Error parsing device data for key ${id}:`, e);
      return { status: 500, data: null, msg: 'Error parsing device data' };
    }
  } catch (e) {
    const msg = handleError(e);
    return { status: 500, data: null, msg: msg };
  }
};

/* Get all data method, returns all devices
 * from AsyncStorage
 */

export const getAllData = async (): Promise<APIResponse> => {
  try {
    // Get all the keys and store them in an array
    const keys = await AsyncStorage.getAllKeys();
    const data = await AsyncStorage.multiGet(keys);

    /*
     * Filter out any null values and map over the array
     * to parse the JSON data and return an array of
     * devices
     */

    const devices: Device[] = data
      .filter(item => item[1] !== null)
      .map(item => {
        const [key, value] = item;
        try {
          const device = JSON.parse(value!) as Device;
          return device;
        } catch (e) {
          console.error(`Error parsing device data for key ${key}:`, e);
          return null;
        }
      })
      .filter((device): device is Device => device !== null);

    return { status: 200, data: devices, msg: 'Devices found' };
  } catch (e) {
    const msg = handleError(e);
    return { status: 500, data: null, msg: msg };
  }
};

const handleError = (e: unknown): string => {
  if (e instanceof Error) return e.message;
  return 'Unknown error';
};
