import React from "react";
import { helperStyles } from "./helperStyles";
import {Text} from "react-native";
import { RoomStatus } from "../Models/types";
export const ColoredStatus = (status: RoomStatus) => {
	switch (status) {
	case RoomStatus.DoneCleaning: return <Text style={helperStyles.dc}>Done Cleaning</Text>;
	case RoomStatus.DoNotDisturb: return <Text style={helperStyles.dnd}>Do Not Disturb</Text>;
	case RoomStatus.InProgressOfCleaning: return <Text style={helperStyles.ipc}>In Progress of Cleaning</Text>;
	case RoomStatus.NeedCleaning: return <Text style={helperStyles.nc}>Need Cleaning</Text>;
	case RoomStatus.CallingReception: return <Text style={helperStyles.cr}>Calling Reception</Text>;
	case RoomStatus.Empty:  return <Text style={helperStyles.normal}>Empty</Text>;
	default: return <Text style={helperStyles.normal}>Occupied</Text>;
	}
};

export const getInitials = (name: string)  => {
	const names = name.split(" ");
	let initials = "";
	for(name in names) {
		const initial = names[name].charAt(0).toUpperCase();
		initials = initials + `${initial}`;
	}
	return initials;

};