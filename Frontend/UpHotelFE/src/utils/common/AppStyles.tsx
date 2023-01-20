import { Dimensions, Platform, StyleSheet } from "react-native";
const screenHeight = Dimensions.get("window").height;
export const cardStyles = StyleSheet.create({
	headline:{
		marginLeft: "24%",
		marginRight: "20%",
	},
	label: {
		marginTop: "5%",
	},
	cardBox: {
		width: (Dimensions.get("window").width *2) / 2.5 ,
		height:(Dimensions.get("window").height) < 900 ? 350 : 380  ,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: "3.5%",
		marginTop: "5%",
		marginLeft: "10%",
		marginRight: "10%",
		overflow: "scroll",
		maxHeight: "auto",
	},
	cardBoxBigger: {
		width: (Dimensions.get("window").width *2) / 2.5 ,
		height:(Dimensions.get("screen").height) < 900 ? 450 : 480  ,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: "3.5%",
		marginTop: "5%",
		marginLeft: "10%",
		marginRight: "10%"
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
	formInputColumns: {
		marginBottom: 0,
		marginLeft: 2,
		marginTop: 5,
		width: "50%"
	},
	formInput: {
		marginBottom: 0,
		marginLeft: 2,
		marginTop: 5,
		width: "100%"
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
		paddingTop: (Dimensions.get("screen").height) < 900 ? "2%" : "10%",
		// marginTop: (Dimensions.get("window").width *2 )/26,
	},
	Button: {
		borderRadius: 5,
		width: "100%",
	},
	LoginButton: {
		borderRadius: 5,
		marginTop: (Dimensions.get("screen").height) < 900 ? "10%" : "20%"
	}
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
		marginTop: -60,
		borderRadius: 3,
		position: "relative",
	},
	headerLogoText: {
		color: "rgba(222, 224, 150, 1)",
		top: -10,
		fontSize: 30,

	},
	headerLogo: {
		top:70,
		position: "relative",
	},
	NamesBox: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
	},
	
});

export const backgroundStyles = StyleSheet.create({
	backgroundText: {
		color: "rgba(222, 224, 150, 0.35)",
		alignItems : "center",
		textAlign: "center",
		fontSize: 80,
		marginTop: 20,
		letterSpacing: 0.46,
	},
	container: {
		flex: 1,
		// maxHeight: "70%",
		overflow: "visible",
	},
	dimensions:{
		height: screenHeight,
	},
	logoText: {
		color: "rgba(222, 224, 150, 1)",
		alignItems : "center",
		textAlign: "center",
		fontSize: 96,
		letterSpacing: 0.46,
		marginTop: "20%",
	},
	logoImg: {
		padding: screenHeight <900 ? 90 : 100,
		marginLeft: "30%",
	} //animation to be added
});