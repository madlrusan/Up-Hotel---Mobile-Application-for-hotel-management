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
		fontSize: 70,
		marginTop: -60,
		letterSpacing: 0.46,
	},
	header: {
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		marginTop: -50,
		borderRadius: 3,
		// position: "relative",
	},
	headerLogoText: {
		color: "rgba(222, 224, 150, 1)",
		top: 0,
		fontSize: 30,

	},
	headerLogo: {
		top:45,
		// left: 0,
		// right: 20,
	},
	cardBox: {
		width: (Dimensions.get("window").width * 9) / 10,
		height:
      Platform.OS === "ios" ? (Dimensions.get("window").height * 5) / 12 + 25 : (Dimensions.get("window").height * 5) / 12,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 16,
		marginTop: 10,
		marginLeft: 20,
		marginRight: 40
	},
	tableContent: {
		overflow: "scroll",
		maxHeight: 250,
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
		marginLeft: 110,

	},
	Button: {
		// flex: 1,
		borderRadius: 5,
		width: 100,
	},
	action: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// marginTop: 20,
		// marginLeft: 110,
		marginRight: -100,
		width: 5,
		// backgroundColor: "rgba(23, 255, 233,1)"
	},
	status:{
		marginLeft: -100,

	},
	actionHeader: {
		marginRight: -120,
	},
	roomText: {
		marginLeft: 20,
	},
	actionButton: {
		width: 5,
	},
});