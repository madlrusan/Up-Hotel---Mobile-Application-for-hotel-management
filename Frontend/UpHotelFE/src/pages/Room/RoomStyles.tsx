import { Dimensions, Platform, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
	},

	cardBox: {
		width: (Dimensions.get("window").width * 9) / 10,
		height:
      Platform.OS === "ios" ? (Dimensions.get("window").height * 6.5) / 12 + 25 : (Dimensions.get("window").height * 6.5) / 12,
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
		// marginLeft: 110,
	},
	Button: {
		// flex: 1,
		borderRadius: 5,
		width: 100,
	},
	OptionButton: {
		// flex: 1,
		borderRadius: 5,
		width: 150,
	},
	Img:{
		// height : 70,
        
		height: Platform.OS === "ios" ? 70 : 100,
		// width: 70,
		width: Platform.OS === "ios" ? 70 : 50
		// marginRight: 1000
	},
	imgButtonContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: 20

	},
	logoText: {
		color: "rgba(222, 224, 150, 0.35)",
		alignItems : "center",
		textAlign: "center",
		fontSize: 70,
		// marginTop: -60,
		marginTop: Platform.OS === "ios" ? -60 : 50,
		letterSpacing: 0.46,
	},

});
