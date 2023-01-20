import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { Appbar, Button, RadioButton, TextInput } from "react-native-paper";
import {  Text, View } from "react-native";
import { backgroundStyles, cardStyles, headerStyle } from "../../../utils/common/AppStyles";
import { UserContext } from "../../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { AppBar } from "../../../utils/common/AppBar/AppBar";


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
				style={backgroundStyles.container}
			>
				<AppBar />
				<Text style={backgroundStyles.backgroundText}> Admin Dashboard </Text>
				<View style={cardStyles.cardBoxBigger}>
					<Text style={cardStyles.formHeader}>Add new staff member</Text>
					<Text style={cardStyles.formSubHeader}>For adding a new receptionist or housekeeper, please complete the following form</Text>
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
							style={cardStyles.formInputColumns}
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
							style={cardStyles.formInputColumns}
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
						style={cardStyles.formInput}
						keyboardType="email-address"
					/>
					<Text style={cardStyles.label}>Select position:</Text>
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
					<View style={cardStyles.buttonContainer}>
						<Button style={cardStyles.Button} mode="contained" compact onPress={() => navigator.goBack()}>
                            Back
						</Button>
						<Button style={cardStyles.Button} mode="contained" compact onPress={onSubmit} disabled={state.isSubmitted}>
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
