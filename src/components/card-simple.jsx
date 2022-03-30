import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import moment from 'moment';
import { esFormat } from '../utils/utils';
import CardHeader from './card-header';

function CardSimple(props) {
  const project = props.project;
  project.humanEndDate = esFormat(moment(project.closingDate.toDate()).format('D-M-yyyy'));
  project.humanDrawDate = esFormat(moment(project.drawDate?.toDate()).format('D-M-yyyy'));
  return (
	<TouchableWithoutFeedback key={project.id} onPress={() => props.onPress(project)}>
	  <View style={{paddingTop: 10, paddingRight: 5, paddingLeft: 5}}>
		<View style={styles.container}>
		  <CardHeader project={project} onPress={() => props.onPress(project)}/>
		</View>
	  </View>
	</TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  w70: {
	width: "70%",
  },
  container: {
	display: 'flex',
	height: 390,
	minWidth: 304,
	overflow: "hidden",
	backgroundColor: "#FFFFFF",
	borderRadius: 4,
	borderColor: '#00000033',
	borderWidth: 0,
  },
  image: {
	width: '100%',
	display: 'flex',
	flex: 1,
	resizeMode: 'contain',
	height: 160,
	marginTop: 8,
	marginBottom: 8,
  },
  privateTag: {
	backgroundColor: '#FFFFFF',
	height: 32,
	width: 83,
	alignItems: 'center',
	justifyContent: 'center',
	position: 'absolute',
	top: 0,
	right: 0,
  },
  privateTagText: {
	width: 'auto',
	color: "rgba(0, 0, 0, 0.87);",
	fontFamily: "Quicksand_400Regular",
	fontStyle: "normal",
	fontSize: 14,
	lineHeight: 20,
	letterSpacing: 0.15,
  },
  footerTextGroup: {
	marginLeft: 16,
	marginRight: 16,
	alignItems: "flex-start",
	height: 60,
  },
  footerText: {
	width: 'auto',
	color: "rgba(0, 0, 0, 0.87);",
	fontFamily: "Quicksand_400Regular",
	fontStyle: "normal",
	fontSize: 12,
	lineHeight: 20,
	letterSpacing: 0.15,
	height: 20,
  },
  footerDonationGroup: {
	marginTop: 8,
	padding: 16,
	flexDirection: "row",
	alignItems: "center",
	height: 48,
	marginBottom: 8,
  },
  donationText: {
	width: 'auto',
	color: "#000000",
	fontFamily: "Quicksand_700Bold",
	fontStyle: "normal",
	fontSize: 20,
	lineHeight: 20,
	letterSpacing: 0.25,
	height: 24,
  },
  donationButton: {
	width: 102,
  },

 
});

export default CardSimple;