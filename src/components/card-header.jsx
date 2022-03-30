import React from "react";
import { View, StyleSheet, } from "react-native";
import CardTitle from "./card-title";


function CardHeader(props) {
  const data = props.data;

  const styles = StyleSheet.create({
    header: {
      paddingTop: 8,
      paddingLeft: 16,
      minHeight: 85,
      alignItems: "flex-start",
    },
  });

  return (
    <View style={styles.header}>
      <CardTitle 
        marginLeft={72}
        project = {data}
        onPress = {props.onPress}
      />
    </View>
  );
}

export default CardHeader;