import { Dimensions, Platform, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
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
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: (Dimensions.get("window").height) < 900 ? "15%": "25%",
		// marginLeft: 110,
	},
	Button: {
		borderRadius: 5,
		width: 100,
	},
	OptionButton: {
		borderRadius: 5,
		width: 150,
	},
	PressedOptionButton: {
		borderRadius: 5,
		width: 150,
		backgroundColor: "grey"
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
		marginTop:  "5%",

	},

});
