import { Dimensions, Platform, StyleSheet } from "react-native";
export const formStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cardBox: {
		width: (Dimensions.get("window").width * 8) / 10,
		height:
      Platform.OS === "ios" ? (Dimensions.get("window").height * 5) / 12 + 25 : (Dimensions.get("window").height * 6) / 12,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 16,
		marginTop: 70,
	},
	registerBox: {
		width: (Dimensions.get("window").width * 8) / 10,
		height:
      Platform.OS === "ios" ? (Dimensions.get("window").height * 2) / 3 + 25 : (Dimensions.get("window").height * 2) / 3,
		backgroundColor: "rgba(255, 255, 255, 0.6)",
		borderRadius: 20,
		padding: 16,
	},
	formHeader: {
		color: "rgb(67, 89, 110)",
		textAlign: "center",
		marginBottom: 16,
		fontSize: 24,
		fontWeight: "400",
	},
	formSubHeader: {
		color: "rgb(67, 89, 110)",
		textAlign: "center",
		marginBottom: 16,
		fontSize: 18,
		fontWeight: "200",
	},
	formBox: {
		// padding: 5,
		// textAlign: "left",
		marginBottom: 0,
		marginTop: 5,

	},
	formRedirectionText: {
		color: "rgb(46,49,146)",
		textAlign: "left",
		fontSize: 16,
		fontWeight: "bold",
		paddingBottom: 10,
	},
	formSubmitButton: {
		elevation: 8,
		backgroundColor: "rgb(131,127,175)",
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginVertical: 90,
	},
	formSubmitButtonDisabled: {
		elevation: 8,
		backgroundColor: "rgb(188,187,197)",
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginVertical: 90,
	},
	formSubmitButtonText: {
		fontSize: 18,
		color: "#fff",
		alignSelf: "center",
		textTransform: "uppercase",
	},
});

export const headerStyle = StyleSheet.create({
	logoText: {
		color: "rgba(222, 224, 150, 0.35)",
		alignItems : "center",
		textAlign: "center",
		fontSize: 90,
		marginTop: 0,
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
	NamesBox: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
	}

});