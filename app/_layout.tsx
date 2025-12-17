import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "@/styles/global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import HomeScreen from "./Home";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <HomeScreen />
        <StatusBar
          style="auto"
          backgroundColor={colorScheme === "dark" ? "#000" : "#fff"}
        />
      </ThemeProvider>
      <Toast position="top" />
    </SafeAreaProvider>
  );
}
