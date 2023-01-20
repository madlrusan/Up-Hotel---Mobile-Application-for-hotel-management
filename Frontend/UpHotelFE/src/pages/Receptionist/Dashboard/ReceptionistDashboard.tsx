import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Appbar, Button, DataTable } from "react-native-paper";
import { styles } from "./ReceptionistDashboardStyles";
import { UserContext } from "../../../context/UserContext";
import { CheckIn } from "../CheckIn/CheckIn";
import { CheckOut } from "../CheckOut/CheckOut";
import { useNavigation } from "@react-navigation/native";
import { ColoredStatus, getInitials } from "../../../utils/helperFunctions";
import { helperStyles } from "../../../utils/helperStyles";
import { RoomDashboard } from "../../../constants/model";
import { getData, storeData } from "../../../constants/Storage";
import { AppBar } from "../../../utils/common/AppBar/AppBar";
import { backgroundStyles, cardStyles } from "../../../utils/common/AppStyles";
export const ReceptionistDashboard = () => {
	const userContext = useContext(UserContext);
	const navigator = useNavigation();
	const OnCheckIn = () => {
		navigator.navigate("CheckIn",{});
	};
	const OnCheckOut = () => {
		navigator.navigate("CheckOut",{});
	};
	
	const [list, setList] = useState<RoomDashboard[]>([]);
	async function e () {
		const roomList : RoomDashboard[] = await userContext.getRooms();

		setList(roomList?.map(item => {return item;}));
		// setRefreshed(false);
		return roomList;
	}
	const [refreshed, setRefreshed] = useState<boolean>(false);
	const [backgroundName, setBackgroundName] = useState("");
	const getUserName = async () => {
		const  userName = await getData("userName");
		setBackgroundName(userName);
	};
	useEffect(()=>{
		e();
		// setRefreshed(!refreshed);
	}, [backgroundName,list]);
    
	
	
	getUserName();
	const onLogOut = () => {
		userContext.logOut();
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
				<AppBar />
				<Text style={backgroundStyles.backgroundText}> Reception {getInitials(backgroundName)} </Text>
				<View style={cardStyles.cardBox}>
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