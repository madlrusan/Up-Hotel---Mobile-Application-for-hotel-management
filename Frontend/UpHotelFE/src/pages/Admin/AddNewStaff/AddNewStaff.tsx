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
	const [value, setValue] = useState("");
	const [state, setState] = useState<AddNewStaffState>({
		AddNewStaffCredentialsCredentials: { firstName: "", lastName: "", email: "", position: 0 },
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
		context.login(
			state.AddNewStaffCredentialsCredentials.firstName,
            state.AddNewStaffCredentialsCredentials.lastName,
			state.AddNewStaffCredentialsCredentials.email,
			state.AddNewStaffCredentialsCredentials.position
		);
		setState((prevState) => {
			return { ...prevState, isSubmitted: false };
		});
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
                    <View style={formStyles.NamesBox}>
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
										position: prevState.AddNewStaffCredentialsCredentials.position
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
										position: prevState.AddNewStaffCredentialsCredentials.position
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
										position: prevState.AddNewStaffCredentialsCredentials.position
									},
								};
							})}
						style={formStyles.formBox}
						keyboardType="email-address"
					/>
					<Text style={styles.label}>Select position:</Text>
					<RadioButton.Group onValueChange={value => setValue(value)} value={value}>
						<RadioButton.Item label="Receptionist" value="Receptionist" />
						<RadioButton.Item label="HouseKeeper" value="HouseKeeper" />
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
    position: PositionType;
};
enum PositionType {
"Receptionist",
"HouseKeeper"
}
type AddNewStaffState = {
  AddNewStaffCredentialsCredentials: AddNewStaffCredentialsType;
  isSubmitted: boolean;
};
