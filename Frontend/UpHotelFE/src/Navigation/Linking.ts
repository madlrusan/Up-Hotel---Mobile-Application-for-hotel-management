import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../Models/types";

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.createURL("/")],
	config: {
		screens: {
			Login: "Login",
			AdminDashboard: "AdminDashboard",
			AddNewStaff: "AddNewStaff",
			ReceptionistDashboard: "ReceptionistDashboard",
			CheckIn: "CheckIn",
			CheckOut: "CheckOut"
		},
	},
};

export default linking;
