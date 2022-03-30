import * as React from 'react';
import { useState } from 'react'
import { Text, TextInput } from 'react-native-paper'
import { StyleSheet, View, } from "react-native";

function InputSimple(props) {
  const [hidden, setHidden] = useState(true);
  const [icon, setIcon] = useState("eye");
  const hasLegend = props.legend && props.legend.length;

  function changeVisibility(){
    if (hidden){
      setIcon("eye-off");
    } else {
      setIcon("eye");
    }

    setHidden(!hidden);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    inputContainer: {
      height: 54,
      borderRadius: 4,
      minWidth: props.minWidth || 0,
      marginRight: 32,
      marginLeft: 32,
      marginTop: props.marginTop || 16,
      marginBottom: props.marginBottom || 16,
      overflow: "hidden",
      backgroundColor: "#FFFFFF",
    },
    input: {
      overflow: 'hidden',
      justifyContent: "center",
      color: '#979797',
      paddingBottom: 10,
      fontFamily: "Quicksand_500Medium",
      fontSize: 20,
      backgroundColor: '#FFFFFF',
    },
    legendInput: {
      fontFamily: "Quicksand_400Regular",
      fontStyle: "normal",
      color: "#FFFFFF",
      fontSize: 12,
      paddingHorizontal: 32,
      lineHeight: 16,
      letterSpacing: 0.25,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType || 'default'}
            value={props.value}
            placeholder={props.placeholder || ''}
            underlineColor={'#FFFFFF'}
            theme={{ fonts: { regular: { fontFamily: "Quicksand_500Medium" }}} }
            underlineColorAndroid={props.underlineColorAndroid}
            autoCapitalize={props.autoCapitalize}
            secureTextEntry={props.isPassword ? hidden : false}
            right={ props.isPassword &&
              <TextInput.Icon
                name={icon}
                style={{opacity: (props.value !== "") ? 100 : 0}}
                type='material'
                size={23}
                onPress={() => changeVisibility()}
              />
            }
          />
      </View>
        {hasLegend && <Text style={styles.legendInput}>{props.legend}</Text>}
      </View>
  );
}

export default InputSimple;