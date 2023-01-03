import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  { useEffect } from "react";
import { BackHandler } from "react-native";
import { UserProvider } from "../context/UserContext";
import { Login } from "../pages/Login/Login";
import { AdminDashboard } from "../pages/Admin/Dashboard/AdminDashboard";
import { RootStackParamList } from "../Models/types";
import * as React from "react";
import { AddNewStaff } from "../pages/Admin/AddNewStaff/AddNewStaff";
import {ReceptionistDashboard} from "../pages/Receptionist/Dashboard/ReceptionistDashboard";
import { CheckIn } from "../pages/Receptionist/CheckIn/CheckIn";
import { CheckOut } from "../pages/Receptionist/CheckOut/CheckOut";
import { HouseKeeper } from "../pages/HouseKeeper/HouseKeeper";
import { Room } from "../pages/Room/Room";
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
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="AdminDashboard" component={AdminDashboard} />
						<Stack.Screen name="AddNewStaff" component={AddNewStaff} />
						{/* <Stack.Screen name="ReceptionistDashboard" component={ReceptionistDashboard} />
						<Stack.Screen name="CheckIn" component={CheckIn} />
						<Stack.Screen name="CheckOut" component={CheckOut} /> */}
						<Stack.Screen name="HouseKeeper" component={HouseKeeper} />
						{/* <Stack.Screen name="Room" component={Room} /> */}
					</Stack.Navigator>
				</>
			</UserProvider>
		</>
	);
}
