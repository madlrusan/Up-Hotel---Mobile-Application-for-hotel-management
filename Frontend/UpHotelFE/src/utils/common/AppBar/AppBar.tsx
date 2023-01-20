import React from "react";
import { Appbar } from "react-native-paper";
import { headerStyle } from "../AppStyles";

export const AppBar = () => {
	return (
		<Appbar.Header mode="large" style={headerStyle.header}>
			<Appbar.Content title="UpHotel" titleStyle={headerStyle.headerLogoText}/>
			<Appbar.Action icon={require("../../../assets/Logo.png")} color="rgba(222, 224, 150, 1)" size={50} style={headerStyle.headerLogo}/>
		</Appbar.Header>
	);
};