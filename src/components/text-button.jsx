import * as React from 'react';
import { Text } from 'react-native-paper'
import { View, StyleSheet } from "react-native";

const COLORS = {
  main: '#2C90CB',
  white: '#FFFFFF'
}
const FONTS = {
  main: {
    fontFamily: "Quicksand_700Bold",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  secondary: {
    fontFamily: "Quicksand_500Medium",
      fontStyle: "normal",
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
  }
}

function TextButton(props) {
  const colour = props.color || 'main';
  const font = props.font || 'main'
  const color = COLORS[colour];
  const { fontFamily, fontSize, fontStyle, lineHeight, letterSpacing } = FONTS[font];

  const styles = StyleSheet.create({
    button: {
      color,
      fontFamily,
      fontStyle,
      fontSize,
      lineHeight,
      letterSpacing,
      marginLeft: 32,
      marginRight: 32,
      marginTop: 20,
      height: 24,
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View>
      <Text style={styles.button} onPress={props.onPress}>{props.text}</Text>
    </View>
  );
}

export default TextButton;