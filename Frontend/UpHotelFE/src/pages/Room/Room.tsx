import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import { View, Text, Image } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { formStyles } from "../../../AppStyles";
import { UserContext } from "../../context/UserContext";
import { styles } from "./RoomStyles";
import { RoomStatus } from "../../Models/types";

export const Room = () => {
	const userContext = useContext(UserContext);
	const changeStatus = (status: RoomStatus) => {
		userContext.changeRoomStatus(status);
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
						icon={require("../../assets/Logo.png")}
						color="rgba(222, 224, 150, 1)"
						size={50}
						style={styles.headerLogo}
					/>
				</Appbar.Header>
				<Text style={styles.logoText}> Room A212 </Text>
				<View style={styles.cardBox}>
					<Text style={formStyles.formHeader}>Welcome Jane Doe!</Text>
					<Text>
            We hope you will enjoy your time while staying in our hotel! We made
            this app special for you!
					</Text>
					<Text>
            Please choose the first button for “Do Not Disturb” option, the
            second button for “Clean up the room” option. For more Information,
            please “Call to Reception”, using the third button.
					</Text>
					<View style={styles.imgButtonContainer}>
						<Button
							mode="elevated"
							style={styles.OptionButton}
							onPress={() => {
								changeStatus(RoomStatus.DoNotDisturb);
							}}
						>
							<Image
								style={styles.Img}
								source={require("../../assets/DND.png")}
							/>
						</Button>
						<Button
							mode="elevated"
							style={styles.OptionButton}
							onPress={() => {
								changeStatus(RoomStatus.NeedCleaning);
							}}
						>
							<Image
								style={styles.Img}
								source={require("../../assets/Clean.png")}
							/>
						</Button>
					</View>
					<View style={styles.imgButtonContainer}>
						<Button
							mode="elevated"
							style={styles.OptionButton}
							onPress={() => {
								changeStatus(RoomStatus.CallingReception);
							}}
						>
							<Image
								style={styles.Img}
								source={require("../../assets/Call.png")}
							/>
						</Button>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							style={styles.Button}
							mode="contained"
							compact
							onPress={userContext.logOut}
						>
              Log Out
						</Button>
						<Button
							style={styles.Button}
							mode="contained"
							compact
							onPress={() => {
								changeStatus(RoomStatus.Occupied);
							}}
						>
              Cancel Option
						</Button>
					</View>
				</View>
			</LinearGradient>
		</>
	);
};

