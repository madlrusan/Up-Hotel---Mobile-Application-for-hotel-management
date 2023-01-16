import { Dimensions, Platform, StyleSheet } from "react-native";
export const styles = StyleSheet.create({

	container: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
	},
	logoText: {
		color: "rgba(222, 224, 150, 0.35)",
		alignItems : "center",
		textAlign: "center",
		fontSize: 80,
		marginTop: 0,
		letterSpacing: 0.46,
	},
	cardBox: {
		width: (Dimensions.get("window").width * 8) / 10,
		height:
      Platform.OS === "ios" ? (Dimensions.get("window").height * 7) / 12 + 25 : (Dimensions.get("window").height * 8) / 12,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 16,
		marginTop: 0,
		marginLeft: 40,
		marginRight: 40
	},
	tableContent: {
		overflow: "scroll",
		maxHeight: 200,
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,

	},
	Button: {
		borderRadius: 5,

	},
	label: {
		marginTop: 5,
	}
});
