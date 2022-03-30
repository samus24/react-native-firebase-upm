import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  View,
} from "react-native";
import InputSimple from "../../components/input-simple";
import MainButton from "../../components/main-button";
import TextButton from "../../components/text-button";
import { Title, Text } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { emailIsValid } from "../../utils/utils";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);

  const onFooterLinkPress = () => {
    navigation.navigate("Registration");
  };

  const onForgottenPasswordPress = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(resetPasswordEmail);
      Alert.alert(
        null,
        "Hemos enviado un correo para reestablecer tu contraseña."
      );
    } catch (e) {
      Alert.alert(
        null,
        "Hemos enviado un correo para reestablecer tu contraseña."
      );
    }
    setPasswordModal(false);
    setResetPasswordEmail("");
    return;
  };

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .get()
          .then(async (firestoreDocument) => {
            if (!firestoreDocument.exists) {
              Alert.alert(
                null,
                "Algo ha ido mal, vuelve a intentarlo en unos minutos."
              );
              return;
            }
            const user = firestoreDocument.data();
            if (user.role !== "donor") {
              await firebase.auth().signOut();
              Alert.alert(
                null,
                "Usuario o contraseña incorrectos. Por favor, vuelva a intentarlo."
              );
              return;
            }
          })
          .catch((error) => {
            Alert.alert(
              null,
              "Algo ha ido mal, vuelve a intentarlo en unos minutos."
            );
          });
      })
      .catch((error) => {
        Alert.alert(
          null,
          "Usuario o contraseña incorrectos. Por favor, vuelva a intentarlo."
        );
      });
  };

  return (
    <>
      <SafeAreaView style={styles.safeContainerTop} />
      <SafeAreaView style={styles.safeContainerBottom}>
        <View style={styles.container}>
          <KeyboardAwareScrollView
            style={{ flex: 1, width: "100%" }}
            keyboardShouldPersistTaps="always"
          >
            <Image
              style={styles.logo}
              resizeMode={"contain"}
              source={require("../../../assets/logo.png")}
            />
            <View>
              <InputSimple
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                isPassword={false}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
            <InputSimple
              placeholder="Contraseña"
              onChangeText={(text) => setPassword(text)}
              value={password}
              isPassword={true}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <MainButton
              text={"Iniciar sesión"}
              onPress={onLoginPress}
              disabled={!emailIsValid(email) || password.length < 6}
            />
            <TextButton
              text={"He olvidado mi contraseña"}
              onPress={() => setPasswordModal(true)}
            />
            <View style={styles.footerView}>
              <Text style={styles.footerText}>¿Todavía no tienes cuenta?</Text>
            </View>
            <TextButton text={"Regístrate"} onPress={onFooterLinkPress} />
            <Modal
              animationType="slide"
              visible={passwordModal}
              transparent={true}
              onRequestClose={() => setPasswordModal(false)}
            >
              <View style={styles.centeredView}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <View style={styles.modalView}>
                    <Title style={styles.modalTitle}>
                      Para reestablecer tu contraseña, introduce tu email.
                    </Title>
                    <InputSimple
                      placeholder="Email"
                      smallContainer={true}
                      onChangeText={(text) => setResetPasswordEmail(text)}
                      value={resetPasswordEmail}
                      isPassword={false}
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      minWidth={256}
                    />
                    <View style={styles.buttonRow}>
                      <MainButton
                        text={"Recuperar Contraseña"}
                        onPress={onForgottenPasswordPress}
                        disabled={!emailIsValid(resetPasswordEmail)}
                      />
                      <TextButton
                        text={"Cancelar"}
                        onPress={() => setPasswordModal(false)}
                      />
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </Modal>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}
