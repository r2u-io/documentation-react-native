/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react'
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'

import { WebView } from 'react-native-webview'

import R2U from '@r2u/react-native-ar-sdk'

const customerId = '5e8e7580404328000882f4ae'
const sku = 'RE000001'

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
