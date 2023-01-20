import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, DataTable, Headline } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AddNewStaff } from "../AddNewStaff/AddNewStaff";
import { UserContext } from "../../../context/UserContext";
import { AdminDashBoardUsers } from "../../../constants/model";
import { AppBar } from "../../../utils/common/AppBar/AppBar";
import { backgroundStyles, cardStyles } from "../../../utils/common/AppStyles";
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
	const onLogOut = () => {
		userContext.logOut();
	};
	async function e() { 
		const staffList : AdminDashBoardUsers[]= await userContext.getStaff();
		setList(staffList?.map(item => {return item;}));
	}
	useEffect(() =>{
		e();
	},[userContext]);
	return (
		<>
			<LinearGradient
			// Background Linear Gradient
				colors={["#5856BB", "#E2DA92"]}
				start={{x:0, y:0}}
				end={{x:0, y:1}}
				style={backgroundStyles.container}
			>
				<AppBar  />
				<Text style={backgroundStyles.backgroundText}> Admin Dashboard </Text>
				<View style={cardStyles.cardBox}>
					<DataTable>
						<>
							<Headline style={cardStyles.headline}>Staff Members</Headline>
							<DataTable.Header>
								<DataTable.Title>Staff Name</DataTable.Title>
								<DataTable.Title >Job Position</DataTable.Title>
							</DataTable.Header>
							<ScrollView style={cardStyles.tableContent}>
								{list.map((member, _key) => {return (
									
									
									<DataTable.Row key={`${member.email}${_key}`}>
										<DataTable.Cell>{member.firstName} {member.lastName}</DataTable.Cell>
										<DataTable.Cell>{member.role}</DataTable.Cell>
									</DataTable.Row>);}
								)}
							</ScrollView>
						</>
					</DataTable>
					<View style={cardStyles.buttonContainer}>
						<Button style={cardStyles.Button} mode="contained" compact onPress={onLogOut}>
                            Log Out
						</Button>
						<Button style={cardStyles.Button} mode="contained" compact onPress={OnAddNewStaff}>
                            Add new staff member
						</Button>
					</View>
				</View>
			</LinearGradient>
		</>
	);
};