# R2U Documentation React Native

A integração do SDK de Realidade Aumentada da R2U para React Native é feita através da biblioteca [@r2u/react-native-ar-sdk](https://www.npmjs.com/package/@r2u/react-native-ar-sdk)

### Métodos

```typescript
interface R2U {
  init: (params: {customerId: string}) => Promise<void>;
  isActive: (sku: string) => Promise<boolean>;
  openAR: (sku: string, resize: boolean) => Promise<void>;
  get3DUrl: (sku: string) => Promise<string>;
}
```

| função | descrição |
| ------ | --------- |
| `init` | inicializa a biblioteca e se conecta com o servidor R2U para a disponibilização dos modelos 3D |
| `isActive` | indica se o produto está disponível na plataforma para Realidade Aumentada |
| `openAR` | abre o modelo 3D em realidade aumentada para visualização através da câmera do celular |
| `get3DUrl` | retorna a URL de visualização do modelo 3D, a ser usada em uma webview tal como [react-native-webview](https://github.com/react-native-community/react-native-webview) |

### ReactNativeSampleApp

Na pasta [**ReactNativeSampleApp**](./ReactNativeSampleApp/) é possível ver um aplicativo de exemplo realizando a integração com o SDK

<p float="left">
  <img src="https://real2u-public-assets.s3.amazonaws.com/react-native-ar-sdk/rn-ar-sdk-1.PNG" width="33%"/>
  <img src="https://real2u-public-assets.s3.amazonaws.com/react-native-ar-sdk/rn-ar-sdk-2.JPG" width="33%"/>
  <img src="https://media.giphy.com/media/Kc85TsAaR3B0ChazPV/giphy.gif" width="33%"/>
</p>

### Instalação 

- **iOS**: `pod install`
- **Android**: Não há passos adicionais

### Requisitos

- [iOS 11 ou superior](https://www.apple.com/br/augmented-reality/) para devices selecionados
- [Android 7 ou superior](https://developers.google.com/ar/discover/supported-devices) para devices selecionados
