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
  const [uri, setUri] = useState('')

  useEffect(() => {
    R2U.init({ customerId }).then(() => {
      setInit(true)
    })
  }, [])

  useEffect(() => {
    if (!init) return
    R2U.viewer.getLink(sku).then((link) => {
      setUri(link)
    })
  }, [init])

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          {uri ? <WebView style={styles.webview} source={{ uri }} /> : null}
        </View>
        <Button
          title="AR"
          onPress={() => R2U.ar.open({ sku, resize: false })}
        ></Button>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
