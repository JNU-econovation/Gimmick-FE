import React from 'react';
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env';

const GoogleLoginButton = () => {
  const handleGoogleLogin = async () => {

    console.log('Google login start');
    console.log("Config.IOS_CLIENT_ID", IOS_CLIENT_ID);
    console.log("Config.WEB_CLIENT_ID", WEB_CLIENT_ID);

    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.file"],
      iosClientId: IOS_CLIENT_ID,
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true,
    });

    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      console.log('Google login successful', result);
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  return <GoogleSigninButton onPress={handleGoogleLogin} />;
};

export default GoogleLoginButton;
