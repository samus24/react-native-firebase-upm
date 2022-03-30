import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React, { useEffect, useState } from 'react';
import { firebase } from './src/firebase/config';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';
import { DefaultTheme, configureFonts, Provider as PaperProvider } from 'react-native-paper';
import { LoginScreen, RegistrationScreen, HomeScreen } from './src/screens';
import DrawerContent from './src/navigation/DrawerContent';
import {decode, encode} from 'base-64';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Drawer = createDrawerNavigator();

const defaultGeneralParams = {
  isParticipationPurchaseEnabled: false,
  isRechargeWalletEnabled: false,
};

export default function App() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  let [loaded, error] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
  });

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef.doc(user.uid).get().then((document) => {
          const userData = document.data();
          setLoading(false);
          setUser(userData);
        }).catch((error) => {
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    
  }, []);

  if (!loaded || loading || error) {
    return <AppLoading />;
  } else {
    const fontConfig = {
      web: {
        regular: {
          fontFamily: 'Quicksand_400Regular',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'Quicksand_500Medium,',
          fontWeight: 'normal',
        },
        light: {
          fontFamily: 'Quicksand_300Light',
          fontWeight: 'normal',
        },
        thin: {
          fontFamily: 'Quicksand_700Bold',
          fontWeight: 'normal',
        },
      },
      ios: {
        regular: {
          fontFamily: 'Quicksand_400Regular',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'Quicksand_500Medium,',
          fontWeight: 'normal',
        },
        light: {
          fontFamily: 'Quicksand_300Light',
          fontWeight: 'normal',
        },
        thin: {
          fontFamily: 'Quicksand_700Bold',
          fontWeight: 'normal',
        },
      },
      android: {
        regular: {
          fontFamily: 'Quicksand_400Regular',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'Quicksand_500Medium,',
          fontWeight: 'normal',
        },
        light: {
          fontFamily: 'Quicksand_300Light',
          fontWeight: 'normal',
        },
        thin: {
          fontFamily: 'Quicksand_700Bold',
          fontWeight: 'normal',
        },
      }
    };

    const theme = {
      ...DefaultTheme,
      fonts: configureFonts(fontConfig),
      roundness: 2,
      colors: {
        ...DefaultTheme.colors,
        primary: '#3239E5',
        accent: '#2C90CB',
      },
    };
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{headerShown: false}}
            drawerPosition="right"
          >
            { user ? (
              <>
                <Drawer.Screen
                  name="Home"
                  component={HomeScreen}
                />
              </>
            ) : (
              <>
                <Drawer.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{
                    gestureEnabled: false
                  }}
                />
                <Drawer.Screen
                  name="Registration"
                  component={RegistrationScreen}
                  options={{
                    gestureEnabled: false
                  }}
                />
              </>
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

registerRootComponent(App);
