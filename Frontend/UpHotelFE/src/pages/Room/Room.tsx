import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import { View, Text, Image } from "react-native";
import { Appbar, Button } from "react-native-paper";
import { cardStyles, headerStyle } from "../../utils/common/AppStyles";
import { UserContext } from "../../context/UserContext";
import { styles } from "./RoomStyles";
import { RoomStatus } from "../../Models/types";
import { getData } from "../../constants/Storage";

export const Room = () => {
	const userContext = useContext(UserContext);
	const changeStatus = (id: number|string, status: RoomStatus) => {
		userContext.changeRoomStatus(id, status);
	};
	const [id, setId] = useState("");
	const [backgroundName, setBackgroundName] = useState("");
	const [guestName, setGuestName] = useState("");
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
				style={styles.container}
			>
				<Appbar.Header mode="medium" style={headerStyle.header}>
					<Appbar.Content title="UpHotel" titleStyle={headerStyle.headerLogoText} />
					<Appbar.Action
						icon={require("../../assets/Logo.png")}
						color="rgba(222, 224, 150, 1)"
						size={50}
						style={headerStyle.headerLogo}
					/>
				</Appbar.Header>
				<Text style={styles.logoText}> Room {backgroundName}</Text>
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
							style={styles.OptionButton}
							onPress={() => {
								changeStatus(id, RoomStatus.DoNotDisturb);
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
								changeStatus(id, RoomStatus.NeedCleaning);
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
								changeStatus(id, RoomStatus.CallingReception);
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

