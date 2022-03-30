import React, { useState } from "react";
import { Image, Text, View, SafeAreaView, Alert } from "react-native";
import InputSimple from "../../components/input-simple";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MainButton from "../../components/main-button";
import TextButton from "../../components/text-button";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = async () => {
    if (!fullName) {
      Alert.alert(null, "El nombre es obligatorio.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(null, "Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 6) {
      Alert.alert(null, "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const uid = response.user.uid;
      const data = {
        name: fullName,
		    creationDate: firebase.firestore.Timestamp.now(),
      };
      const usersRef = firebase.firestore().collection("users");
      await usersRef.doc(uid).set(data);
      await firebase.auth().currentUser.sendEmailVerification();
    } catch (e) {
      console.log(e);
      try {
        await firebase.auth().currentUser.delete();
      } catch (e2) {
        console.log(e2);
      }
      Alert.alert(
        null,
        "Ocurrió un problema durante el registro, inténtalo de nuevo más tarde"
      );
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeContainerTop} />
      <SafeAreaView style={styles.safeContainerBottom}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          keyboardShouldPersistTaps="always"
        >
          <Image
            style={styles.logo}
            resizeMode={"contain"}
            source={require("../../../assets/logo.png")}
          />
          <InputSimple
            style={styles.input}
            marginTop={8}
						marginBottom={8}
            placeholder="Nombre"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <InputSimple
            placeholder="Email"
            marginTop={8}
						marginBottom={8}
            isPassword={false}
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <InputSimple
            secureTextEntry
            placeholder="Contraseña"
            marginTop={8}
						marginBottom={8}
            isPassword={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <InputSimple
            secureTextEntry
            placeholder="Confirmar Contraseña"
            marginTop={8}
						marginBottom={8}
            isPassword={true}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <MainButton
            onPress={() => onRegisterPress()}
            text={"Crear cuenta"}
          />
          <View style={styles.footerView}>
            <Text style={styles.footerText}>¿Ya tienes cuenta? </Text>
            <TextButton onPress={onFooterLinkPress} text={"Inicia sesión"} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}
