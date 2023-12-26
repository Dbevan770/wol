import { createContext, useState, useEffect } from 'react';
import {
  getAllData,
  getData,
  storeData,
  removeData,
} from '@/lib/async-storage';

import { NewDevice, Device } from '@/types';

type DevicesContextType = {
  devices: Device[];
  selectedDevice: Device | null;
  isLoading: boolean;
  setSelectedDevice: (device: Device | null) => void;
  setDevices: (devices: Device[]) => void;
  addDevice: (newDevice: NewDevice) => Promise<DevicesContextReturnType>;
  removeDevice: (device: Device) => void;
  editDevice: (deviceID: string, deviceProperties: Partial<Device>[]) => void;
  getDevice: (deviceID: string) => void;
  getAllDevices: () => void;
};

type DevicesContextReturnType = {
  success: boolean;
  data: Device[] | Device | null;
  error?: unknown;
};

export const DevicesContext = createContext<DevicesContextType | null>(null);

export const DevicesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addDevice = async (
    newDevice: NewDevice,
  ): Promise<DevicesContextReturnType> => {
    setIsLoading(true);
    const response = await storeData({ newDevice });

    if (response.status === 500) {
      console.log('Error storing device data');
      setIsLoading(false);
      return { success: false, data: null, error: response.msg };
    }

    if (response.status === 200) {
      console.log('Successfully stored device data');
      const device = response.data as Device;
      setDevices(prevDevices => [...prevDevices, device]);
      if (!selectedDevice) setSelectedDevice(device);
      setIsLoading(false);
      return { success: true, data: response.data as Device };
    }

    console.log('An unexpected error occurred. Please try again.');
    setIsLoading(false);
    return {
      success: false,
      data: null,
      error: 'An unexpected error occured. Please try again.',
    };
  };

  const removeDevice = async (device: Device) => {
    setIsLoading(true);
    const originalDevices = [...devices];
    setDevices(prevDevices =>
      prevDevices.filter(prevDevice => prevDevice.id !== device.id),
    );

    const response = await removeData(device.id);

    if (response.status === 500) {
      console.log('Error removing device data');
      setDevices(originalDevices);
      setIsLoading(false);
      return;
    }

    if (response.status === 200) {
      console.log('Successfully removed device data');
      setIsLoading(false);
      return;
    }

    console.log('An unexpected error occurred. Please try again.');
    setDevices(originalDevices);
    setIsLoading(false);
  };

  const editDevice = async (
    deviceID: string,
    deviceProperties: Partial<Device>[],
  ) => {
    setIsLoading(true);
    setDevices(prevDevices =>
      prevDevices.map(prevDevice => {
        if (prevDevice.id === deviceID) {
          return {
            ...prevDevice,
            ...deviceProperties,
          };
        }
        return prevDevice;
      }),
    );
    setIsLoading(false);
  };

  const getDevice = async (deviceID: string) => {
    setIsLoading(true);
    const response = await getData(deviceID);
    if (response.status === 500) {
      console.log('Error getting device data');
      setIsLoading(false);
      return;
    }

    if (response.status === 200) {
      console.log('Successfully got device data');
      setIsLoading(false);
      return response.data;
    }

    console.log('An unexpected error occurred. Please try again.');
    setIsLoading(false);
  };

  const getAllDevices = async (): Promise<DevicesContextReturnType> => {
    setIsLoading(true);

    const response = await getAllData();

    if (response.status === 500) {
      console.log('Error getting device data');
      setIsLoading(false);
      return { success: false, data: null, error: response.msg };
    }

    if (response.status === 200) {
      console.log('Successfully got device data');
      setIsLoading(false);
      return { success: true, data: response.data as Device[] };
    }

    console.log('An unexpected error occurred. Please try again.');
    setIsLoading(false);
    return {
      success: false,
      data: null,
      error: 'An unexpected error occured. Please try again.',
    };
  };

  useEffect(() => {
    const initialFetch = async () => {
      const response = await getAllDevices();

      if ('error' in response) {
        console.log(response.error);
        return;
      }

      const devices = response.data as Device[];

      setDevices(devices);
      setSelectedDevice(devices[0]);
    };

    initialFetch();
  }, []);

  return (
    <DevicesContext.Provider
      value={{
        devices,
        selectedDevice,
        setSelectedDevice,
        isLoading,
        setDevices,
        addDevice,
        removeDevice,
        editDevice,
        getDevice,
        getAllDevices,
      }}>
      {children}
    </DevicesContext.Provider>
  );
};
