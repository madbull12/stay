import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
const LoginPage = () => {
  useWarmUpBrowser();
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.inputField, { marginBottom: 30 }]}
        autoCapitalize="none"
        placeholder="Email"
      />
      <TouchableOpacity style={[styles.btn]}>
        <Text
          style={[styles.btnText, { fontFamily: "mont-sb", color: "white" }]}
        >
          Continue
        </Text>
      </TouchableOpacity>
      <View style={styles.seperatorView}>
        <View style={styles.lineSeparator}></View>
        <Text>or</Text>
        <View style={styles.lineSeparator}></View>
      </View>
      <TouchableOpacity style={styles.btnOutline}>
        <Ionicons name="phone-portrait-outline" size={24} color="black" />

        <Text style={styles.btnOutlineText}>Continue with Phone</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnOutline}  onPress={onPress}>
        <AntDesign name="google" size={24} color="black" />

        <Text style={styles.btnOutlineText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: Colors.light.background,
  },
  inputField: {
    borderColor: Colors.light.secondary,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btn: {
    backgroundColor: Colors.light.primary,
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
  },
  seperatorView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 30,
  },
  lineSeparator: {
    borderBottomWidth: 1,
    flex: 1,
    borderBottomColor: Colors.light.secondary,
  },
  btnOutline: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 50,
    marginBottom: 30,
  },
  btnOutlineText: {
    fontFamily: "mont-sb",
    textAlign: "center",
  },
});

export default LoginPage;
