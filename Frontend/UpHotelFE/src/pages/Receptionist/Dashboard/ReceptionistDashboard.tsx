import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Appbar, Button, DataTable } from "react-native-paper";
import { styles } from "./ReceptionistDashboardStyles";
import { UserContext } from "../../../context/UserContext";
import { CheckIn } from "../CheckIn/CheckIn";
import { CheckOut } from "../CheckOut/CheckOut";
import { useNavigation } from "@react-navigation/native";
import { ColoredStatus } from "../../../utils/helperFunctions";
import { helperStyles } from "../../../utils/helperStyles";
import { RoomDashboard } from "../../../constants/model";
import { getData } from "../../../constants/Storage";
export const ReceptionistDashboard = () => {
	const userContext = useContext(UserContext);
	const navigator = useNavigation();
	const OnCheckIn = () => {
		navigator.navigate(CheckIn);
	};
	const OnCheckOut = () => {
		navigator.navigate(CheckOut);
	};
	const onLogOut = () => {
		userContext.logOut();
	};
	const [list, setList] = useState<RoomDashboard[]>([]);
	async function e () {
		const roomList : RoomDashboard[] = await userContext.getRooms();
		setList(roomList?.map(item => {return item;}));
	}
	useEffect(()=>{
		e();
	}, [userContext]);
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
				start={{x:0, y:0}}
				end={{x:0, y:1}}
				style={styles.container}
			>
				<Appbar.Header mode="medium" style={styles.header}>
					<Appbar.Content title="UpHotel" titleStyle={styles.headerLogoText}/>
					<Appbar.Action icon={require("../../../assets/Logo.png")} color="rgba(222, 224, 150, 1)" size={50} style={styles.headerLogo}/>
				</Appbar.Header>
				<Text style={styles.logoText}> Reception {backgroundName} </Text>
				<View style={styles.cardBox}>
					<DataTable>
						<>
							<DataTable.Header>
								<DataTable.Title>Room Id</DataTable.Title>
								<DataTable.Title>Room Name.</DataTable.Title>
								<DataTable.Title >Status</DataTable.Title>
							</DataTable.Header>
							<ScrollView style={styles.tableContent}>
								{list.map((room, key) =>{
									return (
										<DataTable.Row key={key}>
											<DataTable.Cell>{room.id}</DataTable.Cell>
											<DataTable.Cell>{room.name}</DataTable.Cell>
											<DataTable.Cell>{ColoredStatus(room.status)}</DataTable.Cell>
										</DataTable.Row>);
								})}
							</ScrollView>
						</>
					</DataTable>
					<View style={styles.buttonContainer}>
						<Button style={styles.Button} mode="contained" compact onPress={onLogOut}>
                            Log Out
						</Button>
						<Button style={styles.Button} mode="contained" compact onPress={OnCheckIn}>
                            CHECK IN
						</Button>
						<Button style={styles.Button} mode="contained" compact onPress={OnCheckOut}>
                            CHECK OUT
						</Button>
					</View>
				</View>
			</LinearGradient>
		</>
	);
};