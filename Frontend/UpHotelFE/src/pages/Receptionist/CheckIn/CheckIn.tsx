import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { backgroundStyles, cardStyles } from "../../../utils/common/AppStyles";
import { UserContext } from "../../../context/UserContext";
import { getData } from "../../../constants/Storage";
import { getInitials } from "../../../utils/helperFunctions";
import { AppBar } from "../../../utils/common/AppBar/AppBar";


export const CheckIn = () => {
	const context = useContext(UserContext);
	const navigator = useNavigation();
	const [state, setState] = useState<CheckInGuestState>({
		CheckInGuestCredentials: { firstName: "", lastName: "", emailAddress: "", room: 0},
		isSubmitted: true,
	});
	useEffect(()=> {
		if(state.CheckInGuestCredentials.firstName !== "" && state.CheckInGuestCredentials.emailAddress !== "" && state.CheckInGuestCredentials.lastName !== ""){
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
				style={backgroundStyles.container}
			>
				<AppBar />
				<Text style={backgroundStyles.backgroundText}> Reception {getInitials(backgroundName)}</Text>
				<View style={cardStyles.cardBox}>
					<Text style={cardStyles.formHeader}>Check IN New Guests</Text>
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
						style={cardStyles.formInput}
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
						style={cardStyles.formInput}
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
						style={cardStyles.formInput}
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
										room: parseInt(number),
									},
								};
							})}
						style={cardStyles.formInput}
						keyboardType="numeric"
					/>
					<View style={cardStyles.buttonContainer}>
						<Button style={cardStyles.Button} mode="contained" compact onPress={() => navigator.navigate("ReceptionistDashboard", {})}>
                            Back
						</Button>
						<Button style={cardStyles.Button} mode="contained" compact onPress={onSubmit} disabled={state.isSubmitted}>
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
