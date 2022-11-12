import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  { useEffect } from "react";
import { BackHandler } from "react-native";
import { UserProvider } from "../context/UserContext";
import { Login } from "../pages/Login/Login";
import { AdminDashboard } from "../pages/Admin/Dashboard/AdminDashboard";
import { RootStackParamList } from "../Models/types";
import * as React from "react";
export default function Navigation() {
	return (
		<NavigationContainer>
			<RootNavigator  />
		</NavigationContainer>
	);
}
const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => true
		);
		return () => backHandler.remove();
	}, []);
	return (
		<>
			<UserProvider >
				<>
					<Stack.Navigator
						screenOptions={{ headerShown: false, gestureEnabled: false }}
					>
						{/* <Stack.Screen name="Home" component={Home} /> */}
						{/* <Stack.Screen name="Login" component={Login} /> */}
						<Stack.Screen name="AdminDashboard" component={AdminDashboard} />
					</Stack.Navigator>
				</>
			</UserProvider>
		</>
	);
}
