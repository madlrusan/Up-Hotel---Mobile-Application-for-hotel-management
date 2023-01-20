import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { UserContext } from "../../context/UserContext";
import LottieView from "lottie-react-native";
import { backgroundStyles, cardStyles } from "../../utils/common/AppStyles";
import { styles } from "./LoginStyles";
export const Login = ()=>{
	const context = useContext(UserContext);
	// const navigator = useNavigation();
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
				style={backgroundStyles.container}
			>
				<Text style={backgroundStyles.logoText}> Up </Text>
				{/* <Image style={backgroundStyles.logoImg} source={require("../../assets/Logo.png")}/> */}
				<LottieView  source={require("../../assets/animations/index.json")} autoPlay loop style={backgroundStyles.logoImg}/>
				<View style={styles.cardBox}>
					<Text style={cardStyles.formHeader}>Welcome to UpHotel!</Text>
					<Text style={cardStyles.formSubHeader}>Please Login with given credentials</Text>
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
						style={cardStyles.formInput}
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
						style={cardStyles.formInput}
						secureTextEntry={true}/>
					<Button style={cardStyles.LoginButton} mode="contained" compact onPress={onSubmit} disabled={state.isSubmitted} > Sign In</Button>
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
