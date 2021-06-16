<h1 align="center">
    <a href="https://www.npmjs.com/package/@r2u/react-native-ar-sdk">
        <img src="https://img.shields.io/badge/version-0.1.5-green">
    </a>
    <br/>
    <img src="https://real2u-public-assets.s3.amazonaws.com/images/logo-r2u.png" title="logo" width="200"/>
</h1>

# R2U Documentation React Native

A integração do SDK de Realidade Aumentada da R2U para React Native é feita através da biblioteca [@r2u/react-native-ar-sdk](https://www.npmjs.com/package/@r2u/react-native-ar-sdk)

### Métodos

```typescript
interface R2U {
  init: (params: { customerId: string }) => Promise<void>
  isActive: (sku: string) => Promise<boolean>
  deviceSupportsAR: () => Promise<boolean>
  openAR: (sku: string, resize?: boolean) => Promise<void>
  get3DUrl: (sku: string) => Promise<string>
}
```

| função             | descrição                                                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `init`             | inicializa a biblioteca e se conecta com o servidor R2U para a disponibilização dos modelos 3D                                                                                                         |
| `isActive`         | indica se o produto está disponível na plataforma para Realidade Aumentada                                                                                                                             |
| `deviceSupportsAR` | retorna se o dispositivo suporta Realidade Aumentada (conforme lista oficial [iOS](https://www.apple.com/augmented-reality/) e [Android](https://developers.google.com/ar/discover/supported-devices)) |
| `openAR`           | abre o modelo 3D em realidade aumentada para visualização através da câmera do celular (por padrão `resize` falso)                                                                                     |
| `get3DUrl`         | retorna a URL de visualização do modelo 3D, a ser usada em uma webview tal como [react-native-webview](https://github.com/react-native-community/react-native-webview)                                 |

### ReactNativeSampleApp

<p float="left">
  <img src="https://real2u-public-assets.s3.amazonaws.com/react-native-ar-sdk/rn-ar-sdk-1.PNG" width="33%"/>
  <img src="https://real2u-public-assets.s3.amazonaws.com/react-native-ar-sdk/rn-ar-sdk-2.JPG" width="33%"/>
  <img src="https://media.giphy.com/media/Kc85TsAaR3B0ChazPV/giphy.gif" width="33%"/>
</p>

### Instalação

Adicione o módulo no projeto

```
# usando npm
npm install @r2u/react-native-ar-sdk

# usando yarn
yarn add @r2u/react-native-ar-sdk
```

Etapas adicionais

#### iOS

1. Inclua a permissão de acesso a câmera no seu [`Info.plist`](https://developer.apple.com/documentation/arkit/verifying_device_support_and_user_permission#2970474)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "___">
<plist version="1.0">
<dict>
  <key>NSCameraUsageDescription</key>
  <string>Camera usada para visualização de produtos em Realidade Aumentada</string>
  ...
</dict>
</plist>
```

2. Instale o React Native pod

```
cd ios
pod install
```

#### Android

1. Inclua a permissão de acesso a câmera no seu [`AndroidManifest.xml`](https://developers.google.com/ar/develop/java/enable-arcore#ar_optional_apps)

```xml
<uses-permission android:name="android.permission.CAMERA" />

<application …>
    ...

    <!-- "AR Optional" app, contains non-AR features that can be used when
         "Google Play Services for AR" (ARCore) is not available. -->
    <meta-data android:name="com.google.ar.core" android:value="optional" />
</application>
```

### Uso

```tsx
// outras bibliotecas de estado também podem ser utilizadas para fazer a inicialização do módulo
// por simplicidade, esta demonstração utiliza react hooks
import React, { useState } from 'react'
import { View, Button } from 'react-native'
import Webview from 'react-native-webview'
import R2U from '@r2u/react-native-ar-sdk'

const customerId = '5e8e7580404328000882f4ae'
const sku = 'RE000001'

const App: () => React$Node = () => {
  const [hasInit, setHasInit] = useState(false)
  const [url3D, setUrl3D] = useState('')
  const [deviceSupportsAR, setDeviceSupportsAR] = useState(false)

  ;(async () => {
    if (hasInit) {
      return
    }
    setDeviceSupportsAR(await R2U.deviceSupportsAR())
    await R2U.init({ customerId })
    setHasInit(true)

    if (!(await R2U.isActive(sku))) {
      return
    }

    setUrl3D(await R2U.get3DUrl(sku))
  })()

  return (
    <>
      <View>
        <View>
          {hasInit && (
            <Button
              title={
                deviceSupportsAR
                  ? 'Veja em Realidade Aumentada'
                  : 'Dispositivo não suporta Realidade Aumentada'
              }
              disabled={!deviceSupportsAR}
              onPress={() => R2U.openAR(sku, false)}
            />
          )}
        </View>
        {url3D ? <Webview source={{ uri: url3D }} /> : null}
      </View>
    </>
  )
}
```

### Possíveis problemas

##### (Android) Missing 'package' key attribute on element package at [com.google.ar:core:1.19.0] AndroidManifest.xml

Esse problema ocorre em razão de uma [versão antiga do gradle](https://android-developers.googleblog.com/2020/07/preparing-your-build-for-package-visibility-in-android-11.html) que não suporta o ARCore, o SDK de Realidade Aumentada do Google para Android. Basta atualizar para a versão 4.1 ou realizar o processo indicado para versões anteriores.
