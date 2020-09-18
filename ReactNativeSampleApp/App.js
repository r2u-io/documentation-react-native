import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Webview from 'react-native-webview';
import R2U from '@r2u/react-native-ar-sdk';

const customerId = '5e8e7580404328000882f4ae';
const sku = 'RE000001';

const App: () => React$Node = () => {
  const [hasInit, setHasInit] = useState(false);
  const [url3D, setUrl3D] = useState('');
  const [deviceSupportsAR, setDeviceSupportsAR] = useState(false);

  (async () => {
    if (hasInit) {
      return;
    }
    setDeviceSupportsAR(await R2U.deviceSupportsAR());
    await R2U.init({customerId});
    setHasInit(true);

    if (!(await R2U.isActive(sku))) {
      return;
    }

    setUrl3D(await R2U.get3DUrl(sku));
  })();

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.h1}>React Native AR SDK</Text>
            </View>
            <View style={styles.sectionContainer}>
              {
                hasInit &&
                  <Button
                    title={deviceSupportsAR ? "Veja em Realidade Aumentada" : "Dispositivo não suporta Realidade Aumentada"}
                    disabled={!deviceSupportsAR}
                    onPress={() => R2U.openAR(sku, true)}
                  />
              }
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {url3D ? <Webview style={styles.webview} source={{uri: url3D}} /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  h1: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.black,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  webview: {
    marginTop: 32,
    flex: null,
    height: 300,
  },
});

export default App;
