import * as React from 'react';
import { Text } from 'react-native-paper'
import { TouchableOpacity, View, StyleSheet } from "react-native";

const COLORS = {
  main: '#3239E5'
}

function MainButton(props) {
  let color = props.color || 'main';
  const backgroundColor = COLORS[color];

  const styles = StyleSheet.create({
    button: {
      backgroundColor: props.disabled ? "#D3D3D3" : backgroundColor,
      opacity: props.disabled ? 0.5 : 1,
      marginLeft: props.marginL || 32,
      marginRight: props.marginR || 32,
      marginTop: 16,
      height: 48,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonTitle: {
      fontFamily: "Quicksand_700Bold",
      color: props.disabled ? "#979797" : "#FFFFFF",
      fontStyle: "normal",
      fontSize: 20,
      lineHeight: 24,
      letterSpacing: 0.15,
      paddingHorizontal: 16,
    }
  });

  return (
    <View>
      <TouchableOpacity
          style={styles.button}
          onPress={() => props.onPress()}
          disabled={props.disabled}
      >
        <Text style={styles.buttonTitle}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MainButton;