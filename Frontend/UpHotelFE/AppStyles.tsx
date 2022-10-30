import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	inputView: {
		backgroundColor: "#ffffff",
		borderRadius: 30,
		width: "70%",
		height: 45,
		marginBottom: 20,

		alignItems: "center",
	},

	TextInput: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 20,
		alignItems:"center",
	},

	forgot_button: {
		height: 30,
		marginBottom: 30,
	},

	loginBtn: {
		width: "80%",
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#ffffff",
	},

	loginText: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 20,
		alignItems:"center",
		justifyContent: "center",
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
		backgroundColor: "rgb(32, 36, 81)",
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginVertical: 10,
	},
	formSubmitButtonDisabled: {
		elevation: 8,
		backgroundColor: "rgba(32, 36, 81,0.5)",
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginVertical: 10,
	},
	formSubmitButtonText: {
		fontSize: 18,
		color: "#fff",
		alignSelf: "center",
		textTransform: "uppercase",
	},
});