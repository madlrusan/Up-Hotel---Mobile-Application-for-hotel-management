import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { Appbar, Button, RadioButton, TextInput } from "react-native-paper";
import { styles } from "./AddNewStaffStyles";
import {  Text, View } from "react-native";
import { formStyles, headerStyle } from "../../../../AppStyles";
import { UserContext } from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";


export const AddNewStaff = () => {
	const context = useContext(UserContext);
	const navigator = useNavigation();
	const [roleValue, setRoleValue] = useState("");
	const [state, setState] = useState<AddNewStaffState>({
		AddNewStaffCredentialsCredentials: { firstName: "", lastName: "", email: "", role: "" },
		isSubmitted: true,
	});
	useEffect(()=> {
		if(state.AddNewStaffCredentialsCredentials.firstName !== "" && state.AddNewStaffCredentialsCredentials.email !== "" && state.AddNewStaffCredentialsCredentials.lastName !== "" ){
			setState((prevState) => {
				return { ...prevState, isSubmitted: false };
			});
		} else {
			setState((prevState) => {
				return { ...prevState, isSubmitted: true };
			});
		}
	}, [state.AddNewStaffCredentialsCredentials]);
	const onSubmit = () => {
		setState((prevState) => {
			return { ...prevState, isSubmitted: true };
		});
		context.addStaff(
			state.AddNewStaffCredentialsCredentials.firstName,
			state.AddNewStaffCredentialsCredentials.lastName,
			state.AddNewStaffCredentialsCredentials.email,
			state.AddNewStaffCredentialsCredentials.role
		);
		setState((prevState) => {
			return { ...prevState, isSubmitted: false };
		});
		navigator.navigate("AdminDashboard",{});
	};
	return (

		<>
			<LinearGradient
			// Background Linear Gradient
				colors={["#5856BB", "#E2DA92"]}
				start={{x:0, y:0}}
				end={{x:0, y:1}}
				style={styles.container}
			>
				<Appbar.Header mode="medium" style={headerStyle.header}>
					<Appbar.Content title="UpHotel" titleStyle={headerStyle.headerLogoText}/>
					<Appbar.Action icon={require("../../../assets/Logo.png")} color="rgba(222, 224, 150, 1)" size={50} style={headerStyle.headerLogo}/>
				</Appbar.Header>
				<Text style={styles.logoText}> Admin Dashboard </Text>
				<View style={styles.cardBox}>
					<Text style={formStyles.formHeader}>Add new staff member</Text>
					<Text style={formStyles.formSubHeader}>For adding a new receptionist or housekeeper, please complete the following form</Text>
					<View style={headerStyle.NamesBox}>
						<TextInput
							label="First Name"
							value={state.AddNewStaffCredentialsCredentials.firstName}
							mode="outlined"
							onChangeText={(text: string) => 
								setState((prevState) => {
									return {
										...prevState,
										AddNewStaffCredentialsCredentials: {
											firstName: text,
											lastName: prevState.AddNewStaffCredentialsCredentials.lastName,
											email: prevState.AddNewStaffCredentialsCredentials.email,
											role: prevState.AddNewStaffCredentialsCredentials.role
										},
									};
								})}
							style={formStyles.formBox}
							keyboardType="default"
						/>
						<TextInput
							label="Last Name"
							value={state.AddNewStaffCredentialsCredentials.lastName}
							mode="outlined"
							onChangeText={(text: string) => 
								setState((prevState) => {
									return {
										...prevState,
										AddNewStaffCredentialsCredentials: {
											firstName: prevState.AddNewStaffCredentialsCredentials.firstName,
											lastName: text,
											email: prevState.AddNewStaffCredentialsCredentials.email,
											role: prevState.AddNewStaffCredentialsCredentials.role
										},
									};
								})}
							style={formStyles.formBox}
							keyboardType="default"
						/>
					</View>
					<TextInput
						label="Email address"
						value={state.AddNewStaffCredentialsCredentials.email}
						mode="outlined"
						onChangeText={(text: string) => 
							setState((prevState) => {
								return {
									...prevState,
									AddNewStaffCredentialsCredentials: {
										firstName: prevState.AddNewStaffCredentialsCredentials.firstName,
										lastName: prevState.AddNewStaffCredentialsCredentials.lastName,
										email: text,
										role: prevState.AddNewStaffCredentialsCredentials.role
									},
								};
							})}
						style={formStyles.formBox}
						keyboardType="email-address"
					/>
					<Text style={styles.label}>Select position:</Text>
					<RadioButton.Group onValueChange={value => {
						setRoleValue(value);
						setState((prevState) => {
							return {
								...prevState,
								AddNewStaffCredentialsCredentials: {
									firstName: prevState.AddNewStaffCredentialsCredentials.firstName,
									lastName: prevState.AddNewStaffCredentialsCredentials.lastName,
									email: prevState.AddNewStaffCredentialsCredentials.email,
									role: value
								},
							};
						}); }} value={roleValue}>
						<RadioButton.Item label="Receptionist" value="Reception"  />
						<RadioButton.Item label="HouseKeeper" value="Housekeeping"  />
					</RadioButton.Group>
					<View style={styles.buttonContainer}>
						<Button style={styles.Button} mode="contained" compact onPress={() => navigator.goBack()}>
                            Back
						</Button>
						<Button style={styles.Button} mode="contained" compact onPress={onSubmit} disabled={state.isSubmitted}>
                            Confirm
						</Button>
					</View>
				</View>
			</LinearGradient>
		</>
	);
};

type AddNewStaffCredentialsType = {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
};

type AddNewStaffState = {
  AddNewStaffCredentialsCredentials: AddNewStaffCredentialsType;
  isSubmitted: boolean;
};
