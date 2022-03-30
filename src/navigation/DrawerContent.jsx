import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import {
	DrawerContentScrollView,
	DrawerItem,
} from '@react-navigation/drawer';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { Drawer } from 'react-native-paper';
import { firebase } from '../firebase/config';

const appJson = require('../../app.json')

export default function DrawerContent(props) {

	const signOutUser = async () => {
		try {
			await firebase.auth().signOut();
			props.navigation.navigate('Login');
		} catch (e) {}
	}


	return (
	  <DrawerContentScrollView style={{paddingTop: 0, backgroundColor: '#3239E5'}} {...props}>
			<View style={styles.logoContainer}>
				<Pressable onPress={() => props.navigation.navigate('Campañas')}>
					<Image
						style={styles.logo}
						source={require('../../assets/logoWhite.png')}
					/>
				</Pressable>
			</View>
			<Drawer.Section style={styles.drawerSection}>
				<View style={styles.columnContainer}>
					<Pressable disabled={true}>
						<DrawerItem
							inactiveTintColor={'#FFFFFF'}
							label={`Versión: ${appJson.expo.version}`}

						/>
					</Pressable>
					<DrawerItem
						label="Cerrar sesión"
						inactiveTintColor={'#FFFFFF'}
						onPress={signOutUser}
					/>
				</View>
			</Drawer.Section>
	  </DrawerContentScrollView>
	);
  };

  const styles = StyleSheet.create({
	drawerContent: {
	  flex: 1,
	  alignItems: "center",
	},
	drawerSection: {
	},
	logo: {
		height: 19,
		width: 56,
		alignSelf: "center",
    },
	logoContainer: {
		flex: 1,
		height: 56,
		marginTop: 32
	},
	textColorWhite: {
		color: '#FFFFFF',
	},
	columnContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	buttonRow: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		width: 300,
		justifyContent: "center",
	  },
  });