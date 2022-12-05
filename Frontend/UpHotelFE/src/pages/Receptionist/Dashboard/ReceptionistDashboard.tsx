import { View, Text, ScrollView } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Appbar, Button, DataTable } from "react-native-paper";
import { styles } from "./ReceptionistDashboardStyles";
import { rooms } from "../../../constants/mock-data";
import { UserContext } from "../../../context/UserContext";
import { CheckIn } from "../CheckIn/CheckIn";
import { CheckOut } from "../CheckOut/CheckOut";
import { useNavigation } from "@react-navigation/native";
import { ColoredStatus } from "../../../utils/helperFunctions";
import { helperStyles } from "../../../utils/helperStyles";
export const ReceptionistDashboard = () => {
	const userContext = useContext(UserContext);
	const navigator = useNavigation();
	const OnCheckIn = () => {
		navigator.navigate(CheckIn);
	};
	const OnCheckOut = () => {
		navigator.navigate(CheckOut);
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
					<Appbar.Action icon={require("../../../assets/Logo.png")} color="rgba(222, 224, 150, 1)" size={50} style={styles.headerLogo}/>
				</Appbar.Header>
				<Text style={styles.logoText}> Reception Mary Jane </Text>
				<View style={styles.cardBox}>
					<DataTable>
						<>
							<DataTable.Header>
								<DataTable.Title>Room No.</DataTable.Title>
								<DataTable.Title >Status</DataTable.Title>
							</DataTable.Header>
							<ScrollView style={styles.tableContent}>
								{rooms.map((room, key) =>{
									return (
										<DataTable.Row key={key}>
											<DataTable.Cell>{room.number}</DataTable.Cell>
											<DataTable.Cell>{ColoredStatus(room.status)}</DataTable.Cell>
										</DataTable.Row>);
								})}
							</ScrollView>
						</>
					</DataTable>
					<View style={styles.buttonContainer}>
						<Button style={styles.Button} mode="contained" compact onPress={userContext.logOut}>
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