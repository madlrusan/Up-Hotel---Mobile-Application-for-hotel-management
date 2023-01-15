import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { formStyles } from "../../../../AppStyles";
import { UserContext } from "../../../context/UserContext";
import { styles } from "./CheckInStyles";
import { getData } from "../../../constants/Storage";

export const CheckIn = () => {
	const context = useContext(UserContext);
	const navigator = useNavigation();
	const [state, setState] = useState<CheckInGuestState>({
		CheckInGuestCredentials: { firstName: "", lastName: "", emailAddress: "", room: 0},
		isSubmitted: true,
	});
	useEffect(()=> {
		if(state.CheckInGuestCredentials.firstName !== "" && state.CheckInGuestCredentials.emailAddress !== "" && state.CheckInGuestCredentials.lastName !== "" && state.CheckInGuestCredentials.room !== ""){
			setState((prevState) => {
				return { ...prevState, isSubmitted: false };
			});
		} else {
			setState((prevState) => {
				return { ...prevState, isSubmitted: true };
			});
		}
	}, [state.CheckInGuestCredentials]);
	const onSubmit = () => {
		setState((prevState) => {
			return { ...prevState, isSubmitted: true };
		});
		context.checkIn(
			state.CheckInGuestCredentials.firstName,
			state.CheckInGuestCredentials.lastName,
			state.CheckInGuestCredentials.emailAddress,
			state.CheckInGuestCredentials.room
		);
		setState((prevState) => {
			return { ...prevState, isSubmitted: false };
		});
		navigator.navigate("ReceptionistDashboard", {});
	};
	const [backgroundName, setBackgroundName] = useState("");
	const getUserName = async () => {
		const  userName = await getData("userName");
		setBackgroundName(userName);
	};
	getUserName();
	return (
		<>
			<LinearGradient
			// Background Linear Gradient
				colors={["#5856BB", "#E2DA92"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={styles.container}
			>
				<Appbar.Header mode="medium" style={styles.header}>
					<Appbar.Content title="UpHotel" titleStyle={styles.headerLogoText} />
					<Appbar.Action icon={require("../../../assets/Logo.png")} color="rgba(222, 224, 150, 1)" size={50} style={styles.headerLogo} />
				</Appbar.Header>
				<Text style={styles.logoText}> Reception {backgroundName}</Text>
				<View style={styles.cardBox}>
					<Text style={formStyles.formHeader}>Check IN New Guests</Text>
					<TextInput
						label="First Name"
						value={state.CheckInGuestCredentials.firstName}
						mode="outlined"
						onChangeText={(text: string) => setState((prevState) => {
							return {
								...prevState,
								CheckInGuestCredentials: {
									firstName: text,
									lastName: prevState.CheckInGuestCredentials.lastName,
									emailAddress: prevState.CheckInGuestCredentials.emailAddress,
									room: prevState.CheckInGuestCredentials.room
								},
							};
						})}
						style={formStyles.formBox}
						keyboardType="default" />
					<TextInput
						label="Last Name"
						value={state.CheckInGuestCredentials.lastName}
						mode="outlined"
						onChangeText={(text: string) => setState((prevState) => {
							return {
								...prevState,
								CheckInGuestCredentials: {
									firstName: prevState.CheckInGuestCredentials.firstName,
									lastName: text,
									emailAddress: prevState.CheckInGuestCredentials.emailAddress,
									room: prevState.CheckInGuestCredentials.room
								},
							};
						})}
						style={formStyles.formBox}
						keyboardType="default" />
					<TextInput
						label="Email address"
						value={state.CheckInGuestCredentials.emailAddress}
						mode="outlined"
						onChangeText={(text: string) => 
							setState((prevState) => {
								return {
									...prevState,
									CheckInGuestCredentials: {
										firstName: prevState.CheckInGuestCredentials.firstName,
										lastName: prevState.CheckInGuestCredentials.lastName,
										emailAddress: text,
										room: prevState.CheckInGuestCredentials.room
									},
								};
							})}
						style={formStyles.formBox}
						keyboardType="email-address"
					/>
					<TextInput
						label="Room No"
						value={state.CheckInGuestCredentials.room.toString()}
						mode="outlined"
						onChangeText={(number: string) => 
							setState((prevState) => {
								return {
									...prevState,
									CheckInGuestCredentials: {
										firstName: prevState.CheckInGuestCredentials.firstName,
										lastName: prevState.CheckInGuestCredentials.lastName,
										emailAddress: prevState.CheckInGuestCredentials.emailAddress,
										room: number,
									},
								};
							})}
						style={formStyles.formBox}
						keyboardType="numeric"
					/>
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
	);};
type CheckInGuestCredentialsType = {
    firstName: string;
    lastName: string;
    emailAddress: string;
    room: number;
}

type CheckInGuestState = { 
    CheckInGuestCredentials: CheckInGuestCredentialsType;
    isSubmitted: boolean;
}
