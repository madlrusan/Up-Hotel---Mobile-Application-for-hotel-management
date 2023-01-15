import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "./AdminDashbordStyles";
import { ScrollView, Text, View } from "react-native";
import { Appbar, Button, DataTable, Headline } from "react-native-paper";
import { staffMembers } from "../../../constants/mock-data";
import { useNavigation } from "@react-navigation/native";
import { AddNewStaff } from "../AddNewStaff/AddNewStaff";
import { UserContext } from "../../../context/UserContext";
import { AdminDashBoardUsers } from "../../../constants/model";
export const TableRow = (name: string, position: string) => {

	return (
		<View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
			<View style={{ flex: 1, alignSelf: "stretch" }}>{name}</View> 
			<View style={{ flex: 1, alignSelf: "stretch" }} >{position} </View>
			
		</View>

	);
};

export const AdminDashboard = () => {
	const userContext = useContext(UserContext);
	const [page, setPage] = useState<number>(0);
	const navigator = useNavigation();
	const OnAddNewStaff = () => {
		navigator.navigate("AddNewStaff", {});
	};
	const [list, setList] = useState<AdminDashBoardUsers[]>([]);

	useEffect(async () =>{
		const staffList : AdminDashBoardUsers[]= await userContext.getStaff();
		setList(staffList?.map(item => {return item;}));
		return true;
	},[userContext]);
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
				<Text style={styles.logoText}> Admin Dashboard </Text>
				<View style={styles.cardBox}>
					<DataTable>
						<>
							<Headline>Staff Members</Headline>
							<DataTable.Header>
								<DataTable.Title>Staff Name</DataTable.Title>
								<DataTable.Title >Job Position</DataTable.Title>
							</DataTable.Header>
							<ScrollView style={styles.tableContent}>
								{list.map((member, _key) => {return (
									
									
									<DataTable.Row key={`${member.email}${_key}`}>
										<DataTable.Cell>{member.firstName} {member.lastName}</DataTable.Cell>
										<DataTable.Cell>{member.role}</DataTable.Cell>
									</DataTable.Row>);}
								)}
							</ScrollView>
						</>
					</DataTable>
					<View style={styles.buttonContainer}>
						<Button style={styles.Button} mode="contained" compact onPress={userContext.logOut}>
                            Log Out
						</Button>
						<Button style={styles.Button} mode="contained" compact onPress={OnAddNewStaff}>
                            Add new staff member
						</Button>
					</View>
				</View>
			</LinearGradient>
		</>
	);
};