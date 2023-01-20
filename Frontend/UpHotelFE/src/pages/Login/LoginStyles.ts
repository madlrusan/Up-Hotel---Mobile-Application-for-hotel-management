import { Dimensions, Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cardBox: {
		width: (Dimensions.get("window").width *2) / 2.5 ,
		height:(Dimensions.get("window").height) < 900 ? 350 : 380  ,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: "3.5%",
		marginTop: "50%",
		marginLeft: "10%",
		marginRight: "10%",
		overflow: "scroll",
		maxHeight: "auto",
	},
});

