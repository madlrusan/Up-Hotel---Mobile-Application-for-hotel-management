import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { Appbar, DataTable, Button} from "react-native-paper";
import { styles } from "./HouseKeeperStyles";
import { Platform, ScrollView, Text, View } from "react-native";
import { ColoredStatus } from "../../utils/helperFunctions";
import { UserContext } from "../../context/UserContext";
import Popover from "react-native-popover-view";
import { headerStyle } from "../../../AppStyles";
import { RoomStatus } from "../../Models/types";
import { RoomDashboard } from "../../constants/model";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const HouseKeeper = () => {
	const userContext = useContext(UserContext);
	
	const [roomStatus, setRoomStatus] = useState<boolean>(false);
	const [list, setList] = useState<RoomDashboard[]>([]);
	async function e () {
		const roomList : RoomDashboard[] = await userContext.getRooms();
		setList(roomList?.map(item => {return item;}));
	}
	const setStatus = (status: RoomStatus) => {
		userContext.changeRoomStatus(status);
		setRoomStatus(!roomStatus);
		e();
	};
	useEffect(()=>{
		e();
	}, [userContext, roomStatus]);
	
	return (
		<>
			<LinearGradient
			// Background Linear Gradient
				colors={["#5856BB", "#E2DA92"]}
				start={{x:0, y:0}}
				end={{x:0, y:1}}
				style={styles.container}
			>
				<Appbar.Header mode="medium" style={headerStyle.header}>
					<Appbar.Content title="UpHotel" titleStyle={headerStyle.headerLogoText}/>
					<Appbar.Action icon={require("../../assets/Logo.png")} color="rgba(222, 224, 150, 1)" size={50} style={styles.headerLogo}/>
				</Appbar.Header>
				<Text style={styles.logoText}> Housekeeper {localStorage.getItem("userName")}</Text>
				<View style={styles.cardBox}>
					<DataTable>
						<>
							<DataTable.Header>
								<DataTable.Title>Room No.</DataTable.Title>
								<DataTable.Title >Status</DataTable.Title>
								<DataTable.Title style={styles.actionHeader} >#</DataTable.Title>
							</DataTable.Header>
							<ScrollView style={styles.tableContent}>
								{list.map((room, key) =>{
									return (
										
										<DataTable.Row key={key}>
											<DataTable.Cell style={styles.roomText}>{room.name}</DataTable.Cell>
											<DataTable.Cell style={styles.status}>{ColoredStatus(room.status)}</DataTable.Cell>
											<DataTable.Cell style={styles.action}> 
												<View style={styles.Buttons} >
												<Button icon="account-clock" style={styles.actionButton} mode="contained" onPress={() => setStatus(RoomStatus.InProgressOfCleaning)}> In progress...</Button>
												<Button icon="check-circle" style={styles.actionButton} mode="contained"  onPress={() => setStatus(RoomStatus.Occupied)}>Done</Button>
												</View>
											</DataTable.Cell>
										</DataTable.Row>
										
									);
								})}
							</ScrollView>
						</>
					</DataTable>
					<View style={styles.buttonContainer}>
						<Button style={styles.Button} mode="contained" compact onPress={userContext.logOut}>
                            Log Out
						</Button>
					</View>
				</View>

			</LinearGradient>
		</>

	);
};
