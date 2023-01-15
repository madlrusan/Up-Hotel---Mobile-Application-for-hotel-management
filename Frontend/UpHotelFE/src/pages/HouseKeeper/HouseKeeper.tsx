import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import { Appbar, DataTable, Button } from "react-native-paper";
import { styles } from "./HouseKeeperStyles";
import { Alert, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { rooms } from "../../constants/mock-data";
import { ColoredStatus } from "../../utils/helperFunctions";
import { UserContext } from "../../context/UserContext";
import Popover from "react-native-popover-view";
import { headerStyle } from "../../../AppStyles";
import { RoomStatus } from "../../Models/types";

export const HouseKeeper = () => {
	const userContext = useContext(UserContext);
	const setStatus = (status: RoomStatus) => {
		userContext.changeRoomStatus(status);
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
				<Appbar.Header mode="medium" style={styles.header}>
					<Appbar.Content title="UpHotel" titleStyle={styles.headerLogoText}/>
					<Appbar.Action icon={require("../../assets/Logo.png")} color="rgba(222, 224, 150, 1)" size={50} style={styles.headerLogo}/>
				</Appbar.Header>
				<Text style={styles.logoText}> Housekeeper Clary F</Text>
				<View style={styles.cardBox}>
					<DataTable>
						<>
							<DataTable.Header>
								<DataTable.Title>Room No.</DataTable.Title>
								<DataTable.Title >Status</DataTable.Title>
								<DataTable.Title style={styles.actionHeader} >#</DataTable.Title>
							</DataTable.Header>
							<ScrollView style={styles.tableContent}>
								{rooms.map((room, key) =>{
									return (
										
										<DataTable.Row key={key}>
											<DataTable.Cell style={styles.roomText}>{room.number}</DataTable.Cell>
											<DataTable.Cell style={styles.status}>{ColoredStatus(room.status)}</DataTable.Cell>
											<DataTable.Cell style={styles.action}> 
												
												{/* <Button icon="dots-vertical"  style={styles.actionButton} onPress={() => setModalVisible(true)} > 
												</Button> */}
												<View>
													<Button icon="account-clock" style={styles.actionButton} onPress={() => setStatus(RoomStatus.InProgressOfCleaning)}/>
													<Button icon="check-circle" style={styles.actionButton} onPress={() => setStatus(RoomStatus.Occupied)} />
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
