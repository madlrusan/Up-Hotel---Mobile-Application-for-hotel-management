import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { formStyles } from "../../../../AppStyles";
import { UserContext } from "../../../context/UserContext";
import { styles } from "./CheckOutStyles";

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
		if(state.CheckOutCredentials.roomId !== 0 && !isNaN(state.CheckOutCredentials.roomId) && state.CheckOutCredentials.roomId !== "") getUser();
	}, [state.CheckOutCredentials.roomId]);
	const navigator = useNavigation();

	useEffect(() => {
		if (state.CheckOutCredentials.room !== "") {
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
		navigator.goBack();
	};
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
					<Appbar.Action
						icon={require("../../../assets/Logo.png")}
						color="rgba(222, 224, 150, 1)"
						size={50}
						style={styles.headerLogo}
					/>
				</Appbar.Header>
				<Text style={styles.logoText}> Reception Mary Jane </Text>
				<View style={styles.cardBox}>
					<Text style={formStyles.formHeader}>Check OUT in progress...</Text>
					<TextInput
						label="Room No"
						mode="outlined"
						onChangeText={(number: number) =>
							setState((prevState) => {
								return {
									...prevState,
									CheckOutCredentials: {
										roomId: number,
									},
								};
							})
						}
                        
						style={formStyles.formBox}
						keyboardType="numeric"
					/>
					<TextInput
						label="Full Name"
						value={state.CheckOutCredentials.fullName}
						mode="outlined"
						style={formStyles.formBox}
						disabled={true}
					/>
					<TextInput
						label="Email address"
						value={state.CheckOutCredentials.email}
						mode="outlined"
						style={formStyles.formBox}
						disabled={true}
					/>

					<View style={styles.buttonContainer}>
						<Button
							style={styles.Button}
							mode="contained"
							compact
							onPress={() => navigator.goBack()}
						>
              Back
						</Button>
						<Button
							style={styles.Button}
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
  room: string;
};

type CheckOutCredentialsState = {
  CheckOutCredentials: CheckOutCredentialsType;
  isSubmitted: boolean;
};
