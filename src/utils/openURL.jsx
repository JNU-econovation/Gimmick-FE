import {Linking, Alert} from 'react-native';

const openURL = async url => {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('오류', `URL을 열 수 없습니다: ${url}`);
    }
  } catch (error) {
    Alert.alert('오류', error.message);
  }
};

const openWebView = (navigation, title, url) => {
  navigation.navigate('WebView', {title, url});
};

export {openURL, openWebView};
