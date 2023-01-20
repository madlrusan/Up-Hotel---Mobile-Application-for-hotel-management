import { Dimensions, Platform, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	tableContent: {
		overflow: "scroll",
		maxHeight: (Dimensions.get("window").height) < 900 ? 200: 250,
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 20

	},
	Button: {
		// flex: 1,
		borderRadius: 5,

	}
});
