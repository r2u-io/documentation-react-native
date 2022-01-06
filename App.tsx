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
   Text
 } from 'react-native'
 
 import { WebView } from 'react-native-webview'
 
 const styles = StyleSheet.create({
   webview: {
     marginTop: 32,
     width: 400,
     height: 400,
     margin: 'auto',
     backgroundColor: '#ccc',
   },
 })
 

 const MODELS = [
   'Chinelo Top',
   'Chinelo Slim'
  ]
 
 const MATERIALS = [
  '7a247933-ecfc-4eed-afa4-c6b6c1aeb78f',
  'd76297c6-d060-4fae-a1d9-bc3601408551',
  '03a93c9e-723e-4d5e-a616-003f61e94e38',
  '12f85251-928c-4a8a-afb3-27acb430ed85',
  'a8d7aaac-8a3a-4d6a-b163-23964d30ce47',
  'a4301d60-44a4-45b5-b119-6aac9b35ca12',
  '345c86ea-1caa-446a-91e3-ddbf9106d253',
  'b383f2e1-2a35-40c6-8b7c-cd9f7974f715',
  '883d0e69-e1f5-40ec-959c-426f05bda5cd',
  'd4122397-efde-4183-956f-d95a6527dc28',
  '6142924e-5de6-47e3-9ea1-30c38ecaa543',
  '7a94f11b-033b-4381-965e-ca6be26d1906',
  ]
 
 
 const App: React.FC = () => {
   const [loaded, setLoaded] = useState(false)
   const [modelIndex, setModel] = useState(0)
   const [materialIndex, setMaterial] = useState(0)
   const [material2Index, setMaterial2] = useState(0)
   const [pin, setPin] = useState(-1)
   const [currentRef, setCurrentRef] = useState<WebView|null>(null)
   const [latestMessage, setLatestMessage] = useState<unknown>({})
 
   useEffect(() => {
    // focus chinelo on webview
    const zoomScript = `
    var event = new CustomEvent("r2u_focus_object", {
      detail: { 
        object: "Chinelo", 
        zoom: 1.0,
      }
    });
    document.dispatchEvent(event);
    true;
    `;
    currentRef?.injectJavaScript(zoomScript)
    
    // change model on webview
     const model = MODELS[modelIndex]
     const script = `
      var event = new CustomEvent("r2u_change_model", {
        detail: { 
          modelGroup: "0", 
          model: "${model}",
        }
      });
      document.dispatchEvent(event);
      true;
     `;
      currentRef?.injectJavaScript(script)
    }, [modelIndex])
 
   useEffect(() => {
     // change material on webview
     const material = MATERIALS[materialIndex]
     const script = `
       var event = new CustomEvent("r2u_change_material", {
         detail: { 
           model: "Chinelo",
           slot: "sola",
           material: "${material}"
         }
       });
       document.dispatchEvent(event);
       true;
     `;
     currentRef?.injectJavaScript(script)
   }, [modelIndex, materialIndex])
 
   useEffect(() => {
    // change material on webview
    const material2 = MATERIALS[material2Index]
    const script = `
      var event = new CustomEvent("r2u_change_material", {
        detail: { 
          model: "Chinelo",
          slot: "tira",
          material: "${material2}"
        }
      });
      document.dispatchEvent(event);
      true;
    `;
    currentRef?.injectJavaScript(script)
   }, [modelIndex, material2Index])

  useEffect(() => {
    // focus pin on webview
    const zoomScript = `
      var event = new CustomEvent("r2u_focus_object", {
        detail: { 
          object: "Chinelo", 
          zoom: 0.1,
        }
      });
      document.dispatchEvent(event);
      true;
    `;
    currentRef?.injectJavaScript(zoomScript)

    const model = pin === -1 ? "null" : '"Pin"'

    const script = `
      var event = new CustomEvent("r2u_change_model", {
        detail: { 
          modelGroup: "3", 
          model: ${model},
        }
      });
      document.dispatchEvent(event);
      true;
    `;
    currentRef?.injectJavaScript(script)
  }, [pin])
 
   return (
     <SafeAreaView>
       <StatusBar barStyle={'light-content'} />
       <ScrollView contentInsetAdjustmentBehavior="automatic">
         <View>
           <WebView 
             style={styles.webview}
             originWhitelist={['*']}
             javaScriptEnabled={true}
             mixedContentMode={'always'}
             scalesPageToFit={false}
             domStorageEnabled={true}
             startInLoadingState={true}
             baseUrl={''}
             loadWithOverviewMode={true}
             useWideViewPort={true}
             builtInZoomControls={true}
             displayZoomControls={false}
             supportZoom={true}
             defaultTextEncodingName={"utf-8"}
             source={{ uri: 'https://demos.r2u.io/customizer/2021/12/08/16/46/index.html' }}
             ref={r => (setCurrentRef(r))}
             onError={(syntheticEvent) => {
               const { nativeEvent } = syntheticEvent
               console.warn('WebView error: ', nativeEvent)
             }}
             onLoad={(syntheticEvent) => {
               console.log('Finished loading')
             }}
             onMessage={(event) => {
               const message = JSON.parse(event.nativeEvent.data)
              setLatestMessage(message)
              if (message.type === 'MODEL_LOADING_COMPLETE' && !loaded) {
                const zoomScript = `
                  var event = new CustomEvent("r2u_focus_object", {
                    detail: { 
                      object: "Chinelo", 
                      zoom: 1.0,
                    }
                  });
                  document.dispatchEvent(event);
                  true;
                `;
                currentRef?.injectJavaScript(zoomScript)
                setLoaded(true)
              }
             }}
           />
         </View>
         <Button
           title='Trocar chinelo'
           onPress={() => setModel((modelIndex + 1) % MODELS.length)}
         ></Button>
         <Button
           title='Trocar cor da sola'
           onPress={() => setMaterial((materialIndex + 1) % MATERIALS.length)}
         ></Button>
         <Button
           title='Trocar cor da tira'
           onPress={() => setMaterial2((material2Index + 1) % MATERIALS.length)}
         ></Button>
         <Button
           title='Adicionar/remover pin'
           onPress={() => setPin(-pin)}
         ></Button>
         <Text>Latest Message from WebView: {JSON.stringify(latestMessage)}</Text>
       </ScrollView>
     </SafeAreaView>
   )
 }
 
 export default App
 