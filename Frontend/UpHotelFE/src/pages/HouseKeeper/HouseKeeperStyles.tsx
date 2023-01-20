import { Dimensions, StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	tableContent: {
		overflow: "scroll",
		maxHeight: (Dimensions.get("window").height) < 900 ? 200: 250,
	},
	action: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		marginRight: -10,
		width: 5,
		pointerEvents: "all"
	},
	status:{
		marginLeft: "-50%",
	},
	statusCell:{
		marginLeft: -50,
        maxWidth: 80
	},
	actionHeader: {
		marginRight: "-80%",
	},
	roomText: {
		marginLeft: 15,
	},
	actionButton1: {
		width: 200,
		marginLeft: "-30%",
		pointerEvents: "all"
	},
	actionButton2: {
		width: 200,
		marginLeft: "-60%",
		pointerEvents: "all",
		marginTop: "-10%",
	},
	Buttons: {
		backgroundColor: "none",
	},
	LogOutButton: {
		borderRadius: 5,
		width: "100%",
		marginLeft: "35%",
		marginTop: (Dimensions.get("screen").height) < 900 ? "10%" : "-10%"
	},
	backgroundName: {
		color: "rgba(222, 224, 150, 0.35)",
		alignItems : "center",
		textAlign: "center",
		fontSize: (Dimensions.get("screen").width) < 400 ? 60 : 70,
		marginTop: (Dimensions.get("screen").height) < 900 ? 70 : 80,
		letterSpacing: 0.46,
	}
});