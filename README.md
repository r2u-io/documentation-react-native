<h1 align="center">
    <a href="https://www.npmjs.com/package/@r2u/react-native-ar-sdk">
        <img src="https://img.shields.io/badge/version-1.0.0-green">
    </a>
    <br/>
    <img src="https://real2u-public-assets.s3.amazonaws.com/images/logo-r2u.png" title="logo" width="200"/>
</h1>

# R2U Documentation React Native

The integration of R2U AR module in React Native is made by the library [@r2u/react-native-ar-sdk](https://www.npmjs.com/package/@r2u/react-native-ar-sdk)

## Methods

```typescript
interface R2U {
  init: (params: { customerId: string }) => Promise<void>
  sku: {
    isActive: (sku: string) => Promise<boolean>
  }
  ar: {
    isSupported: () => Promise<boolean>
    open: (params: { sku: string; resize?: boolean }) => Promise<void>
  }
  viewer: {
    getLink: (sku: string) => Promise<string>
  }
}
```

| function         | description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| `init`           | Instantiates the R2U module to gather needed information from our API |
| `sku.isActive`   | Indicates the availability of a product in augmented reality          |
| `ar.isSupported` | Displays the compatibility of a device with the AR experience \*      |
| `ar.open`        | Tries to display given SKU model inside the AR experience             |
| `viewer.getLink` | Returns the URL to display the 3D model inside a webview              |

\* List of supported devices = [iOS](https://www.apple.com/augmented-reality/) & [Android](https://developers.google.com/ar/discover/supported-devices)

<!-- ### ReactNativeSampleApp

<p float="left">
  <img src="https://real2u-public-assets.s3.amazonaws.com/react-native-ar-sdk/rn-ar-sdk-1.PNG" width="33%"/>
  <img src="https://real2u-public-assets.s3.amazonaws.com/react-native-ar-sdk/rn-ar-sdk-2.JPG" width="33%"/>
  <img src="https://media.giphy.com/media/Kc85TsAaR3B0ChazPV/giphy.gif" width="33%"/>
</p> -->

## Installation

Add the module to your app project

```
# with npm
npm install @r2u/react-native-ar-sdk

# with yarn
yarn add @r2u/react-native-ar-sdk
```

### Additional steps

#### iOS

1. Add camera access permission request on your [`Info.plist`](https://developer.apple.com/documentation/arkit/verifying_device_support_and_user_permission#2970474)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "___">
<plist version="1.0">
<dict>
  <key>NSCameraUsageDescription</key>
  <string>Camera used to display product in Augmented Reality</string>
  ...
</dict>
</plist>
```

2. Install the React Native pod

```
cd ios
pod install
```

#### Android

1. Add camera access permission request on your [`AndroidManifest.xml`](https://developers.google.com/ar/develop/java/enable-arcore#ar_optional_apps)

```xml
<uses-permission android:name="android.permission.CAMERA" />

<application …>
    ...
    <!-- "AR Optional" app, contains non-AR features that can be used when
         "Google Play Services for AR" (ARCore) is not available. -->
    <meta-data android:name="com.google.ar.core" android:value="optional" />
</application>
```

## Code use

```tsx
// Demo using React Hooks
import React, { useEffect, useState } from 'react'
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

import { WebView } from 'react-native-webview' // Needed to display the 3D model inside the app

import R2U from '@r2u/react-native-ar-sdk'

const customerId = '5e8e7580404328000882f4ae' // Remember to use your ID
const sku = 'RE000001' // Gather from your product page

const styles = StyleSheet.create({
  webview: {
    marginTop: 32,
    width: 400,
    height: 400,
    margin: 'auto',
    backgroundColor: '#ccc',
  },
})

const App: React.FC = () => {
  const [init, setInit] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [canOpenAR, setCanOpenAR] = useState(false)
  const [uri, setUri] = useState('')

  useEffect(() => {
    R2U.init({ customerId }).then(() => {
      setInit(true)
    })
    R2U.ar.isSupported().then((supported) => setCanOpenAR(supported))
  }, [])

  useEffect(() => {
    if (!init) return
    R2U.sku.isActive(sku).then((active) => {
      setIsActive(active)
    })
  }, [init])

  useEffect(() => {
    if (!init || !isActive) return
    R2U.viewer.getLink(sku).then((link) => {
      setUri(link)
    })
  }, [isActive])

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          {uri ? <WebView style={styles.webview} source={{ uri }} /> : null}
        </View>
        <Button
          title="View in your space"
          onPress={() => R2U.ar.open({ sku, resize: false })}
          disabled={!init || !isActive || !canOpenAR}
        ></Button>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
```
