import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import {  Button, TextInput } from "react-native-paper";
import { backgroundStyles, cardStyles } from "../../../utils/common/AppStyles";
import { UserContext } from "../../../context/UserContext";
import { getData } from "../../../constants/Storage";
import { getInitials } from "../../../utils/helperFunctions";
import { AppBar } from "../../../utils/common/AppBar/AppBar";


export const CheckOut = () => {
	const [state, setState] = useState<CheckOutCredentialsState>({
		CheckOutCredentials: { roomId: 0, fullName: "", email: "" },
		isSubmitted: true,
	});
	const context = useContext(UserContext);
	const getUser = async () => {
		const response = await context.getUserByRoomId(state.CheckOutCredentials.roomId);
		if(!(response === false || response.user === null)){
			setState((prevState) => {
				return {
					...prevState,
					CheckOutCredentials: {
						fullName: response?.user.firstName + " " + response?.user.lastName,
						email: response?.user.email,
						roomId: prevState.CheckOutCredentials.roomId
					},
				};
			});
		}
	};
	useEffect(() => {
		if(state.CheckOutCredentials.roomId !== 0 && !isNaN(state.CheckOutCredentials.roomId)) getUser();
	}, [state.CheckOutCredentials.roomId]);
	const navigator = useNavigation();

	useEffect(() => {
		if (state.CheckOutCredentials.roomId.toString() !== "") {
			setState((prevState) => {
				return { ...prevState, isSubmitted: false };
			});
		} else {
			setState((prevState) => {
				return { ...prevState, isSubmitted: true };
			});
		}
	}, [state.CheckOutCredentials]);
	const onSubmit = () => {
		setState((prevState) => {
			return { ...prevState, isSubmitted: true };
		});
		context.checkOut(state.CheckOutCredentials.roomId);
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
					<Text style={cardStyles.formHeader}>Check OUT in progress...</Text>
					<TextInput
						label="Room No"
						mode="outlined"
						onChangeText={(number: string) =>
							setState((prevState) => {
								return {
									...prevState,
									CheckOutCredentials: {
										fullName: prevState.CheckOutCredentials.fullName,
										email: prevState.CheckOutCredentials.email,
										roomId: parseInt(number),
									},
								};
							})
						}
                        
						style={cardStyles.formInput}
						keyboardType="numeric"
					/>
					<TextInput
						label="Full Name"
						value={state.CheckOutCredentials.fullName}
						mode="outlined"
						style={cardStyles.formInput}
						disabled={true}
					/>
					<TextInput
						label="Email address"
						value={state.CheckOutCredentials.email}
						mode="outlined"
						style={cardStyles.formInput}
						disabled={true}
					/>

					<View style={cardStyles.buttonContainer}>
						<Button
							style={cardStyles.Button}
							mode="contained"
							compact
							onPress={() => navigator.goBack()}
						>
              Back
						</Button>
						<Button
							style={cardStyles.Button}
							mode="contained"
							compact
							onPress={onSubmit}
							disabled={state.isSubmitted}
						>
              Confirm
						</Button>
					</View>
				</View>
			</LinearGradient>
		</>
	);
};

type CheckOutCredentialsType = {
  roomId: number;
  fullName: string;
  email: string;
}
type CheckOutCredentialsState = {
  CheckOutCredentials: CheckOutCredentialsType;
  isSubmitted: boolean;
};
