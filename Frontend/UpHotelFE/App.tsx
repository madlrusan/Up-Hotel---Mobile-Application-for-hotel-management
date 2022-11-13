
import React from "react";
import { BackHandler } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Login } from "./src/pages/Login/Login";
import Navigation from "./src/Navigation";
export default function App() {
	BackHandler.addEventListener("hardwareBackPress", () => {
		return true;
	});
	return (
		<SafeAreaProvider>
			<Navigation  />
		</SafeAreaProvider>
	);
}

