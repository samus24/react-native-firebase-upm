import React from "react";
import { Text, StyleSheet, } from "react-native";

function CardTitle(props) {
  const data = props.data;

  const styles = StyleSheet.create({
    title: {
      marginLeft: props.marginLeft || 0,
      width: 'auto',
      color: props.onPress ? "#2C90CB" : "#000000",
      fontFamily: "Quicksand_700Bold",
      fontStyle: "normal",
      fontSize: 20,
      lineHeight: 20,
      letterSpacing: 0.15,
      marginTop: 8,
      minHeight: 20,
    },
    orgName: {
      marginLeft: props.marginLeft || 0,
      width: 'auto',
      color: "rgba(0, 0, 0, 0.87);",
      fontFamily: "Quicksand_400Regular",
      fontStyle: "normal",
      fontSize: 12,
      lineHeight: 20,
      letterSpacing: 0.25,
      height: 20,
    },
  });

  return (
    <>
      <Text style={styles.title} onPress={props.onPress} numberOfLines={2} ellipsizeMode='tail'>{data.title}</Text>
      <Text style={styles.orgName} numberOfLines={1} ellipsizeMode='tail'>{data.orgName}</Text>
    </>
  );
}

export default CardTitle;