import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import { View, Text, Image, Linking } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { backgroundStyles, cardStyles, headerStyle } from "../../utils/common/AppStyles";
import { UserContext } from "../../context/UserContext";
import { styles } from "./RoomStyles";
import { RoomStatus } from "../../Models/types";
import { getData } from "../../constants/Storage";
import { AppBar } from "../../utils/common/AppBar/AppBar";

export const Room = () => {
	const userContext = useContext(UserContext);
	const changeStatus = (id: number|string, status: RoomStatus) => {
		userContext.changeRoomStatus(id, status);
	};
	const [id, setId] = useState("");
	const [backgroundName, setBackgroundName] = useState("");
	const [guestName, setGuestName] = useState("");
	const [dndPressed, setDndPressed] = useState(false);
	const [callingPressed, setCallingPressed] = useState(false);
	const [cleaningPressed, setCleaningPressed] = useState(false);
	const handleCall = () => {
		const phoneNumber = "tel:+40766792230";
		Linking.canOpenURL(phoneNumber)
			.then((supported) => {
				if (!supported) {
					console.log("Can't handle phone call");
				} else {
					return Linking.openURL(phoneNumber);
				}
			})
			.catch((err) => console.error("An error occurred", err));
	};
	const onLogOut = () => {
		userContext.logOut();
	};
	const getId = async () =>{
		const id = await getData("roomId");
		setId(id);
	};
	const getUserName = async () => {
		const  userName = await getData("userName");
		setGuestName(userName);
	};
	const getRoomName = async () => {
		const roomName = await getData("roomName");
		setBackgroundName(roomName);
	};
	getUserName();
	getRoomName();
	getId();
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
				<Text style={backgroundStyles.backgroundText}> Room {backgroundName}</Text>
				<View style={styles.cardBox}>
					<Text style={cardStyles.formHeader}>Welcome {guestName}!</Text>
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
							style={dndPressed? styles.PressedOptionButton : styles.OptionButton}
							onPress={() => {
								changeStatus(id, RoomStatus.DoNotDisturb);
								setDndPressed(true);
								setCallingPressed(false);
								setCleaningPressed(false);
							}}
						>
							<Image
								style={styles.Img}
								source={require("../../assets/DND.png")}
							/>
						</Button>
						<Button
							mode="elevated"
							style={cleaningPressed? styles.PressedOptionButton: styles.OptionButton}
							onPress={() => {
								changeStatus(id, RoomStatus.NeedCleaning);
								setDndPressed(false);
								setCallingPressed(false);
								setCleaningPressed(true);
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
							style={callingPressed ? styles.PressedOptionButton :styles.OptionButton}
							onPress={() => {
								changeStatus(id, RoomStatus.CallingReception);
								handleCall();
								setDndPressed(false);
								setCallingPressed(true);
								setCleaningPressed(false);
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
							onPress={onLogOut}
						>
              Log Out
						</Button>
						<Button
							style={styles.OptionButton}
							mode="contained"
							compact
							onPress={() => {
								changeStatus(id, RoomStatus.Occupied);
								setCallingPressed(false);
								setDndPressed(false);
								setCleaningPressed(false);
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

