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
		marginTop: 20

	},
	Button: {
		// flex: 1,
		// borderRadius: 5,
		backgroundColor: "#34ds",
	},
	OptionButton: {
		// flex: 1,
		// borderRadius: 5,
		color: "#34ds",
		width: 150,
		// width: Platform.OS === "ios" ? 150 : 150,
		height: 90,
		// backgroundColor: "#34ds",
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

});
