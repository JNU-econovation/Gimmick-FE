// WebViewScreen.jsx
import React from 'react';
import {SafeAreaView, Button, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Header from '../../components/common/Header';
const WebViewScreen = ({route, navigation}) => {
  const {url, title} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Header type="webView" title={title} />
        <WebView source={{uri: url}} style={{flex: 1}} />
      </View>
    </SafeAreaView>
  );
};

export default WebViewScreen;
