/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { createContext, FC, useEffect, useState } from "react";
import { getData } from "../constants/Storage";
import { RoomStatus } from "../Models/types";
import { User } from "../Models/User";
import { Login } from "../pages/Login/Login";
import { UserAPI } from "./API/UserAPI";
axios.defaults.withCredentials = true;
type UserContextType = {
  user: User;
  login: any;
  logOut: any;
  getStaff: any;
  addStaff: any;
  changeRoomStatus: (status: RoomStatus) => void;
  checkIn: (
    firstName: string,
    lastName: string,
    emailAddress: string,
    roomId: number
  ) => void;
  // setUser: any;
  // addUser: any;
};

export const UserContext = createContext<UserContextType>(null);

export const UserProvider: FC = (props: { children }) => {
	// const { children } = props;
	const userAPI = new UserAPI();
	const [user, setUser] = useState<User>({
		firstName: "",
		lastName: "",
		email: "",
		id: 0,
		role: "",
	});
	const navigator = useNavigation();
	const login = async (email: string, password: string) => {
		const response = await userAPI.login(email, password);
		if (response !== false) {
			const user = {
				email: response.email,
				role: response.role,
				name: response.name,
			};
			setUser(user);
			if (user.role === "Admin") {
				navigator.navigate("AdminDashboard", {});
			} else if (user.role === "Housekeeping") {
				navigator.navigate("Housekeeper", {});
			} else if (user.role === "Room") {
				navigator.navigate("Room", {});
			} else if (user.role === "Reception") {
				navigator.navigate("ReceptionistDashboard", {});
			}
			// try {
			// 	RoomContext.getRoom();
			// } catch (error) {
			// 	console.log(error);
			// }
		} else {
			console.log("response", response);
		}
	};
	const logOut = () => {
		const response = userAPI.logOut();
		if (response !== false) {
			navigator.navigate("Login", {});
		}
	};
	const addStaff = async (firstName: string, lastName: string, email: string, role: string) => {
		const response = await userAPI.addStaff(firstName, lastName, email, role);
		return await response;
	};

	const getStaff = async () => {
		const response = await userAPI.getStaff();
		// console.log(response);
		if (response !== null) {
			return await response;
		}
	};
	const changeRoomStatus = async (status: RoomStatus) => {
		const response = await userAPI.changeRoomStatus(status);
		return await response;
	};
	const checkIn = async (
		firstName: string,
		lastName: string,
		emailAddress: string,
		roomId: number
	) => {
		const response = await userAPI.checkIn(firstName, lastName, emailAddress, roomId);
		return await response;
	};
	const ctx: UserContextType = {
		user: user,
		login: (email: string, password: string) => login(email, password),
		logOut: () => logOut(),
		getStaff: () => getStaff(),
		addStaff: (firstName: string, lastName: string, email: string, role: string) => addStaff(firstName, lastName, email, role),
		changeRoomStatus: (status: RoomStatus) => changeRoomStatus(status),
		checkIn: (
			firstName: string,
			lastName: string,
			emailAddress: string,
			roomId: number
		) => checkIn(firstName, lastName, emailAddress, roomId),
		// setUser: (newUser: User) => setUser(newUser),
		// addUser: () => addUser(),
	};
	return (
		<UserContext.Provider value={ctx}>{props.children}</UserContext.Provider>
	);
};