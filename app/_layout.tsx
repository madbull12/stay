import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY

const tokenCache = {
  async getToken(key:string) {
    try {
      return SecureStore.getItemAsync(key)
    }catch(err) {
      return null;
    }
  },
  async saveToken(key:string,value:string) {
    try {
      return SecureStore.setItemAsync(key,value)
    } catch(err) {
      return null;
    }
  }
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // ...FontAwesome.font,
    mont: require("../assets/fonts/Montserrat_400Regular.ttf"),
    "mont-sb": require("../assets/fonts/Montserrat_600SemiBold.ttf"),
    "mont-b": require("../assets/fonts/Montserrat_700Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          headerTitleAlign: "center",

          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
          presentation: "modal",
          animation:"fade_from_bottom",

          title: "Login or sign up",
          headerTitleStyle: {
            fontFamily: "mont-sb",
          },
        }}
      />
      <Stack.Screen
        name="(modals)/bookings"
        options={{
          presentation: "modal",
          animation:"fade_from_bottom",
          title: "Bookings",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "mont-sb",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="listing/[id]"
        options={{
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
