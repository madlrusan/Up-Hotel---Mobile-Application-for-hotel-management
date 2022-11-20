import { LinearGradient } from "expo-linear-gradient";
import {  styles } from "./LoginStyles";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { UserContext } from "../../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { formStyles } from "../../../AppStyles";
export const Login = ()=>{
	const context = useContext(UserContext);
	const navigator = useNavigation();
	const [state, setState] = useState<LoginState>({
		loginCredentials: { email: "", password: "" },
		isSubmitted: true,
	});
	useEffect(()=> {
		if(state.loginCredentials.email !== "" && state.loginCredentials.password !== ""){
			setState((prevState) => {
				return { ...prevState, isSubmitted: false };
			});
		} else {
			setState((prevState) => {
				return { ...prevState, isSubmitted: true };
			});
		}
	}, [state.loginCredentials]);
	const onSubmit = () => {
		setState((prevState) => {
			return { ...prevState, isSubmitted: true };
		});
		context.login(
			state.loginCredentials.email,
			state.loginCredentials.password
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
				<Text style={styles.logoText}> UpHotel </Text>
				<Image style={styles.logoImg} source={require("../../../assets/Logo.png")}/>
				<View style={formStyles.cardBox}>
					<Text style={formStyles.formHeader}>Welcome to UpHotel!</Text>
					<Text style={formStyles.formSubHeader}>Please Login with given credentials</Text>
					<TextInput
						label="Email address"
						value={state.loginCredentials.email}
						mode="outlined"
						onChangeText={(text: string) => 
							setState((prevState) => {
								return {
									...prevState,
									loginCredentials: {
										email: text,
										password: prevState.loginCredentials.password,
									},
								};
							})}
						style={formStyles.formBox}
						keyboardType="email-address"

					/>
			
					<TextInput 
						label="Password"
						mode="outlined"
						value={state.loginCredentials.password}
						onChangeText={(text) =>
							setState((prevState) => {
								return {
									...prevState,
									loginCredentials: {
										password: text,
										email: prevState.loginCredentials.email,
									},
								};
							})
						}
						style={formStyles.formBox}
						secureTextEntry={true}/>

					<TouchableOpacity
						onPress={onSubmit}
						disabled={state.isSubmitted}
						style={
							!state.isSubmitted
								? formStyles.formSubmitButton
								: formStyles.formSubmitButtonDisabled
						}
					>
						<Text style={formStyles.formSubmitButtonText}>Sign in</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</>
	);
};

type loginCredentialsType = {
  email: string;
  password: string;
};
type LoginState = {
  loginCredentials: loginCredentialsType;
  isSubmitted: boolean;
};
