import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Image, View } from "react-native";

const TopBar = (props) => {
  return (
    <Appbar.Header style={{ backgroundColor: "white", }}>
      {props.hasBack && <Appbar.BackAction color="#3239E5" onPress={props.expandAction}/>}
      {props.hasIcon ?
        <View
          style={{
            flex: 1,
            width: '100%',
            alignContent: 'flex-start',
            justifyContent: "flex-start",
            padding: 32,
          }}
        >
          <Image
            style={{
              flex: 1,
              height: 24,
              width: 56,
              padding: 16,
            }}
            resizeMode={"contain"}
            source={require("../../assets/logo.png")}
          />
        </View>
        :
        <View
          style={{
            flex: 1,
            padding: 16,
          }}
        >
          <Appbar.Content
            color="#3239E5"
            title={props.title}
            titleStyle={
              {
                fontFamily: "Quicksand_700Bold",
                lineHeight: 24,
                letterSpacing: 0.15,
                fontSize: 20,
              }
            }
          />
        </View>
      }
      {props.isCancel && props.hasAction && <Appbar.Action color="#3239E5" icon={'cancel'} onPress={props.expandAction}/>}
      {!props.isCancel && !props.hasBack && <Appbar.Action color="#3239E5" icon={'menu'} onPress={props.expandAction}/>}
    </Appbar.Header>
  );
  }

export default TopBar