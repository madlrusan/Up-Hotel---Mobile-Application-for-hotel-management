import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { View, Text,  } from "react-native";
import { Appbar, Button , TextInput} from "react-native-paper";
import { formStyles } from "../../../../AppStyles";
import { UserContext } from "../../../context/UserContext";
import { styles } from "./CheckOutStyles";

export const CheckOut = () => {
	const context = useContext(UserContext);
	const navigator = useNavigation();
	const [state, setState] = useState<CheckOutCredentialsState>({
		CheckOutCredentials: { room: "" },
		isSubmitted: true,
	});
	useEffect(()=> {
		if(state.CheckOutCredentials.room !== "" ){
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
		context.login(
			state.CheckOutCredentials.room
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
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				style={styles.container}
			>
				<Appbar.Header mode="medium" style={styles.header}>
					<Appbar.Content title="UpHotel" titleStyle={styles.headerLogoText} />
					<Appbar.Action icon={require("../../../assets/Logo.png")} color="rgba(222, 224, 150, 1)" size={50} style={styles.headerLogo} />
				</Appbar.Header>
				<Text style={styles.logoText}> Reception Mary Jane </Text>
				<View style={styles.cardBox}>
					<Text style={formStyles.formHeader}>Check OUT in progress...</Text>
					<TextInput
						label="Room No"
						value={state.CheckOutCredentials.room}
						mode="outlined"
						onChangeText={(number: string) => 
							setState((prevState) => {
								return {
									...prevState,
									CheckOutCredentials: {
										room: number,
									},
								};
							})}
						style={formStyles.formBox}
						keyboardType="default"
					/>
					<TextInput
						label="Full Name"
						value={"Joe Doe"}
						mode="outlined"
						style={formStyles.formBox}
						disabled={true} />
					<TextInput
						label="Email address"
						value={"Joe.Doe@gmail.com"}
						mode="outlined"
						style={formStyles.formBox}
						disabled={true}
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
	);
};

type CheckOutCredentialsType = {
    room: string;
}

type CheckOutCredentialsState = {
    CheckOutCredentials : CheckOutCredentialsType;
    isSubmitted: boolean;
}