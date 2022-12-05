import React from "react";
import { helperStyles } from "./helperStyles";
import {Text} from "react-native";
export const ColoredStatus = (status: string) => {
	switch (status) {
	case "Do Not Disturb": return <Text style={helperStyles.dnd}>{status}</Text>;
	case "Done Cleaning": return <Text style={helperStyles.dc}>{status}</Text>;
	case "In Progress of Cleaning": return <Text style={helperStyles.ipc}>{status}</Text>;
	case "Need Cleaning": return <Text style={helperStyles.nc}>{status}</Text>;
	case "Calling Reception": return <Text style={helperStyles.cr}>{status}</Text>;
	default: return <Text style={helperStyles.normal}>{status}</Text>;
	}
};