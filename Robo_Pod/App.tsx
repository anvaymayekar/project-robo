// author: @anvaymayekar
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  FlatList,
  PermissionsAndroid,
  Pressable,
} from 'react-native';
import {Joystick, Label, Touch, Frame} from './components';
import {Details} from './frames';
import {colors} from './theme';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';

const showToast = (message?: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message || '',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    80,
  );
};
const NavBar = (): React.JSX.Element => {
  return (
    <View style={styles.navbar}>
      <Label weight="SemiBold" lineHeight={36}>
        Robo Pod
      </Label>
      <Label weight="Medium" size={12} color={colors.secondary}>
        FY ECS1 - VI
      </Label>
    </View>
  );
};

const Watermark = (): React.JSX.Element => {
  return (
    <View style={styles.watermark}>
      <Label weight="Regular" size={12} color={colors.dusk}>
        Created by FYECS1 (Group VI) of
      </Label>
      <Label weight="Medium" size={13} color={colors.secondary}>
        Shah & Anchor Kutchhi Enginering College, Mumbai
      </Label>
    </View>
  );
};

const obtainPermissions = () => {
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(result => {
      if (result) {
        showToast('Location permission granted!');
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(result => {
          if (result) {
            showToast('Permission granted!');
          } else {
            showToast('Permission declined!');
          }
        });
      }
    });
  }
};

obtainPermissions();
function App(): React.JSX.Element {
  const [isAutoPilot, setAutoPilot] = useState<boolean>(false);
  const [isBluetoothFrameVisible, setBluetoothFrameVisible] =
    useState<boolean>(false);
  const [isDetailsFrameVisible, setDetailsFrameVisible] =
    useState<boolean>(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [connectedId, setConnectedId] = useState<string>('');
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(true);

  const sendData = async (message: string) => {
    if (!connectedDevice) return showToast('No device connected!');

    try {
      await connectedDevice.write(message + '\r\n');
    } catch (error) {
      showToast('Failed to send data');
    }
  };
  useEffect(() => {
    // Check if Bluetooth is enabled

    RNBluetoothClassic.isBluetoothEnabled()
      .then(enabled => {
        if (!enabled) {
          setIsBluetoothEnabled(false);
          showToast('Kindly, turn on the bluetooth');
        } else {
          setIsBluetoothEnabled(true);
        }
      })
      .catch(err => console.log('Bluetooth check error', err));

    // Start device discovery if Bluetooth is enabled
    if (isBluetoothEnabled) {
      scanDevices();
    }
  }, [isBluetoothEnabled]);

  const scanDevices = async () => {
    setLoading(true);
    try {
      const pairedDevices = await RNBluetoothClassic.getBondedDevices();
      setDevices(pairedDevices);
    } catch (error) {
      showToast('Kindly, enable your bluetooth');
    }
    setLoading(false);
  };
  // Connect to the selected device
  const connectToDevice = async (device: BluetoothDevice) => {
    setLoading(true);
    try {
      const connected = await RNBluetoothClassic.connectToDevice(device.id);
      if (connected) {
        setConnectedDevice(connected); // ✅ Store the connected instance
        setConnectedId(connected.id);
        showToast(`Connected to ${device.name}`);
      }
    } catch (error) {
      showToast('Failed to connect');
    }
    setLoading(false);
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      if (connectedDevice) {
        await connectedDevice.disconnect(); // Disconnect the currently connected device
        setConnectedDevice(null);
        setConnectedId('');
        showToast(`Disconnected from ${connectedDevice.name}`);
      }
    } catch (error) {
      console.error('Failed to disconnect:', error);
      showToast('Failed to disconnect');
    }
    setLoading(false);
  };
  const openBluetoothFrame = () => {
    scanDevices();
    setBluetoothFrameVisible(true);
  };
  const closeBluetoothFrame = () => setBluetoothFrameVisible(false);

  const openDetailsFrame = () => setDetailsFrameVisible(true);
  const closeDetailsFrame = () => setDetailsFrameVisible(false);

  const toggleAutopilot = () => {
    if (isAutoPilot) {
      sendData('S');
      setAutoPilot(false);
      showToast('Autopilot turned off!');
    } else {
      sendData('A');
      setAutoPilot(true);
      showToast('Your robot is on autopilot!');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <NavBar />
      <Joystick
        isDisabled={isAutoPilot}
        foward={() => sendData('F')}
        stop={() => sendData('S')}
        left={() => sendData('L')}
        right={() => sendData('R')}
        back={() => sendData('B')}
      />
      <View style={styles.console}>
        <Touch
          isGradient
          icon="bluetooth-outline"
          onPress={openBluetoothFrame}
          isDisabled={isAutoPilot}
        />
        <View style={styles.details}>
          <Touch
            isGradient
            icon={isAutoPilot ? 'stop' : 'play'}
            onPress={toggleAutopilot}
          />
        </View>
        <Touch
          isGradient
          icon="filter"
          onPress={openDetailsFrame}
          isDisabled={isAutoPilot}
        />
      </View>

      <Watermark />

      <Frame
        isModalVisible={isDetailsFrameVisible}
        closeModal={closeDetailsFrame}>
        <Details />
      </Frame>

      <Frame
        isModalVisible={isBluetoothFrameVisible}
        closeModal={closeBluetoothFrame}>
        <View style={styles.bluetoothCover}>
          {/* Scan Button */}
          <Pressable
            android_ripple={{
              color: colors.ripple,
              borderless: true,
              foreground: true,
            }}
            onPress={scanDevices}
            style={styles.button}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={[colors.one, colors.two, colors.three]}
              style={styles.linearGradient}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Label color={colors.white} size={16}>
                  Scan for devices
                </Label>
              )}
            </LinearGradient>
          </Pressable>

          {/* List of Available Devices */}

          <FlatList
            data={devices}
            style={styles.btFlatlist}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Pressable
                android_ripple={{
                  color: colors.ripple,
                  borderless: true,
                  foreground: true,
                }}
                onPress={() =>
                  connectedId == item.id
                    ? handleDisconnect()
                    : connectToDevice(item)
                }
                style={styles.deviceItem}>
                <View
                  style={{
                    backgroundColor:
                      connectedId == item.id ? colors.ripple : colors.base,
                    ...styles.innerView,
                  }}>
                  <View>
                    <Label
                      color={
                        item.id == connectedId ? colors.three : colors.secondary
                      }
                      size={18}
                      weight="Medium">
                      {item.name || 'Unnamed Device'}
                    </Label>
                    <Label size={14} weight="Regular">
                      {item.id}
                    </Label>
                  </View>
                  {item.id === connectedId ? (
                    <Icon
                      name="link-outline"
                      color={colors.one}
                      size={26}
                      style={{transform: 'rotate(-45deg)'}}
                    />
                  ) : (
                    <Icon
                      name="unlink-outline"
                      color={colors.secondary}
                      size={26}
                      style={{transform: 'rotate(-45deg)'}}
                    />
                  )}
                </View>
              </Pressable>
            )}
          />
        </View>
      </Frame>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base,
    alignItems: 'center',
  },
  navbar: {
    width: '100%',
    height: '18%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  console: {
    height: '18%',
    width: '100%',
    paddingTop: '2%',
    paddingHorizontal: '10%',
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'flex-start',
    justifyContent: 'space-between',
    overflow: 'visible',
  },
  watermark: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '4%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    marginTop: 40,
  },
  bluetoothCover: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    height: '10%',
    borderRadius: 24,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    overflow: 'hidden',
  },

  deviceItem: {
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '5%',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  deviceName: {fontSize: 16, fontWeight: 'bold'},
  deviceInfo: {fontSize: 14, color: '#555'},
  connectedText: {fontSize: 18, fontWeight: 'bold', marginVertical: 10},
  btFlatlist: {
    width: '100%',

    padding: 0,
  },
  communicationContainer: {alignItems: 'center', width: '100%'},
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    flex: 1,
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;
